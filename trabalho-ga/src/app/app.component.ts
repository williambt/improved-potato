import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { Physics } from 'phaser';
import { BulletSettings } from './Bullet'
import { EmptyError } from 'rxjs';
//import { Enemy } from './Enemy';
/**
 * Application component.
 */
@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`
})
export class AppComponent extends Phaser.Scene {
  /**
   * Game instance.
   */
  public game: Phaser.Game;

  /**
   * Game configuration.
   */
  public readonly gameConfig: GameConfig = {
    title: environment.title,
    version: environment.version,
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 }
      }
    },
    scene: this
  }

  player : Physics.Arcade.Sprite;
  cursors : Phaser.Input.Keyboard.CursorKeys;
  fireKey : Phaser.Input.Keyboard.Key;
  precisionMovement : Phaser.Input.Keyboard.Key;
  speed : number = 350;
  maximumSpeed : number = 350;
  precisionSpeed : number = 150;


  bulletSettings : BulletSettings = new BulletSettings(10, 10, new Phaser.Math.Vector2(0,-90),1, -90);

  enemies : Enemy[] = [];

  // player stats
  score : number = 0;
  readonly maxHealth : number = 100;
  health : number = this.maxHealth;


  //Use these to set HUD related values
  setScore(score : number) : void
  {
    this.score = score;
    this.updateScoreDisplay();
  }

  addScore(ammount : number) : void
  {
    this.score += ammount;
    this.updateScoreDisplay();
  }

  
  setHealth(health : number) : void
  {
    this.health = health;
    if(this.health > this.maxHealth) this.health = this.maxHealth;
    else if (this.health < 0) this.health = 0;
    this.setHealthBarStyle();
  }
  
  addHealth(ammount : number) : void
  {
    this.health += ammount;
    if(this.health > this.maxHealth) this.health = this.maxHealth;
    else if (this.health < 0) this.health = 0;
    this.setHealthBarStyle();
  }
  
  //HUD Updaters
  setHealthBarStyle() : void
  {
    let healthBar : HTMLElement = (document.getElementById("health").getElementsByClassName("fore")[0] as HTMLElement);
    healthBar.style.width = this.health / this.maxHealth * 100 + '%';
    healthBar.style.backgroundColor = this.health > this.maxHealth / 2 ? 'green' : this.health > this.maxHealth / 5 ? 'yellow' : 'red';
  }
  updateScoreDisplay() : void
  {
    this.score = Math.floor(this.score);
    //document.getElementById("score-value").innerText = this.score.toString();
  }


  preload() : void
  {
    this.load.setBaseURL("../assets");
    
    this.load.image('sky', "sky.png");
    this.load.image('player', "Player_ship.png");
    this.load.image('bullet1', "bullet1.png");
    this.load.image('bullet2', "enemy_bullet.png");
    this.load.spritesheet('Enemy_big', 
        'enemy-big.png',
        { frameWidth: 32, frameHeight: 32 }
    );
    this.load.spritesheet('Enemy_medium', 
        'enemy-medium.png',
        { frameWidth: 32, frameHeight: 16 }
    );
    this.load.spritesheet('Enemy_small', 
        'enemy-small.png',
        { frameWidth: 16, frameHeight: 16 }
    );

    this.anims.create({
      key: 'Enemy_big_anim',
      frames: this.anims.generateFrameNumbers('Enemy_big', { start: 0, end: 11}),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: 'Enemy_medium_anim',
      frames: this.anims.generateFrameNumbers('Enemy_medium', { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: 'Enemy_small_anim',
      frames: this.anims.generateFrameNumbers('Enemy_small', { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1
    });
  

    
  }
  
  create() : void
  {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    this.player = this.physics.add.sprite(400, 500, 'player');
    this.player.setOrigin(0.5,0.5);
    (this.player.body as Phaser.Physics.Arcade.Body).allowGravity = false;
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.precisionMovement = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.enemies.push(new Enemy(this, 100 , 200, 'Enemy_big' ));
    this.enemies.push(new Enemy(this, 300,200, 'Enemy_medium'));
    this.enemies.push(new Enemy(this, 500, 200, 'Enemy_small'));
    
    this.enemies.forEach(enemy => {
      (enemy.body as Phaser.Physics.Arcade.Body).allowGravity = false;
      enemy.setVelocityY(100);
      this.physics.add.collider(this.player, enemy, () =>{
        enemy.disableBody();
        enemy.visible = false;
        this.setHealth(this.health-10);
      });
    });

  }

  update() : void
  {
    this.handleInput();
    // if (this.bullets.length > 0) 
    // {
    //   for(let bul of this.bullets)
    //   {
    //     bul.update();
    //   }
    // }
    if (this.enemies.length > 0) {
      for (const enemy of this.enemies) {
        if (enemy.active) {
          enemy.update();
        }
      }
    }
  }

  
  /**
   * Instantiate application component.
   */
  public constructor() { super({ key: 'sceneA', active: true }); }
  
  /**
   * Game ready event handler.
   *
   * @param game Game instance.
   */
  public onGameReady(game: Phaser.Game): void {
    this.game = game;
  }



  clock : number = 0;
  hasFired : boolean = false;
  handleInput()
  {
    if(this.cursors.left.isDown)
    {
      this.player.setVelocityX(-this.speed);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.setVelocityX(this.speed);
    }
    else
    {
      this.player.setVelocityX(0);
    }
    
    if(this.cursors.up.isDown)
    {
      this.player.setVelocityY(-this.speed);
    }
    else if (this.cursors.down.isDown)
    {
      this.player.setVelocityY(this.speed);
    }
    else
    {
      this.player.setVelocityY(0);
    }
    
    if(this.fireKey.isDown)
    {
      if (!this.hasFired) {
        this.fire(this.player, this.bulletSettings);
        this.hasFired = true;
      }
      else
      {
        this.clock += this.game.loop.delta/100;
        if (this.clock > this.bulletSettings.fireRate) 
        {
          this.clock = 0;
          this.hasFired = false;
        }
      }
    }
    if (this.precisionMovement.isDown) 
    {
      this.speed = this.precisionSpeed;
    }
    else
    {
      this.speed = this.maximumSpeed;
    }
  }


  //bullets : Bullet[] = [];
  fire(user : Physics.Arcade.Sprite, settings : BulletSettings)
  {
    let newBullet = this.physics.add.sprite(user.x, user.y, 'bullet1');
    newBullet.angle = settings.angle;
    (newBullet.body as Phaser.Physics.Arcade.Body).allowGravity = false;
    //newBullet.body.collideWorldBounds = true;
    newBullet.setVelocity(settings.dir.x * settings.speed,settings.dir.y * settings.speed);
    this.physics.add.overlap(newBullet, this.enemies, (bullet : Physics.Arcade.Sprite , enemy :  Physics.Arcade.Sprite) =>{
      bullet.visible = false;
      bullet.disableBody();
      bullet.destroy();

      let enemyRef : Enemy = enemy as Enemy;
      enemyRef.setHealth(enemyRef.health - settings.damage);
      if (enemyRef.health < 0) {
        enemyRef.visible = false;
        this.score += 10;
      }
    });
   // this.bullets.push(new Bullet(newBullet, settings)); 
  }
}

export class Enemy extends Phaser.Physics.Arcade.Sprite
{
    health : number = 150;
    bulletSettings : BulletSettings = new BulletSettings(10, 10, new Phaser.Math.Vector2(0,90),5, -90);

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | integer) 
    { 
        super(scene, x, y, texture, frame); 
        
        this.scene.physics.add.existing(this.scene.add.existing(this));
    }
    setHealth(hp : number)
    {
        this.health = hp;
    }
    clock : number = 0;
    hasFired : boolean = false;
    update() : void
    {
      if (this.y > (this.scene as AppComponent).gameConfig.height) {
          this.y = -100;
      }
      if (!this.hasFired) {
        this.fire(this, this.bulletSettings);
        this.hasFired = true;
      }
      else
      {
        this.clock += this.scene.game.loop.delta/100;
        if (this.clock > this.bulletSettings.fireRate) 
        {
          this.clock = 0;
          this.hasFired = false;
        }
      }
      if (this.health < 0) {
        this.disableBody();
        this.destroy();
      }
    }
    fire(user : Physics.Arcade.Sprite, settings : BulletSettings)
    {
      let newBullet = this.scene.physics.add.sprite(user.x, user.y, 'bullet2');
      newBullet.angle = settings.angle;
      (newBullet.body as Phaser.Physics.Arcade.Body).allowGravity = false;
      //newBullet.body.collideWorldBounds = true;
      newBullet.setVelocity(settings.dir.x * settings.speed,settings.dir.y * settings.speed);
      this.scene.physics.add.overlap(newBullet, (this.scene as AppComponent).player, (bullet : Physics.Arcade.Sprite , player :  Physics.Arcade.Sprite) =>{
        (this.scene as AppComponent).addHealth(-settings.damage);
        bullet.visible = false;
        bullet.disableBody();
        bullet.destroy();
      });
    }
}