import { Component, enableProdMode } from '@angular/core';
import { environment } from '../environments/environment';
import { Physics } from 'phaser';
import { BulletSettings } from './Bullet'
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  speed : number = 300;
  maximumSpeed : number = 300;
  precisionSpeed : number = 150;


  bulletSettings : BulletSettings = new BulletSettings(20, 10, new Phaser.Math.Vector2(0,-90),1, -90);

  enemies : Enemy[] = [];

  // player stats
  score : number = 0;
  readonly maxHealth : number = 100;
  health : number = this.maxHealth;
  gameover : boolean = false;

  name : string;

  addHealth(delta : number)
  {
    this.health += delta;
    if (this.health < 0) 
    {
      this.health = 0;
    }
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
    this.createEnemies();
  }
  createEnemies()
  {
    this.enemies.push(new Enemy(this, 70, -200,  'Enemy_big'));
    this.enemies.push(new Enemy(this, 140, -200, 'Enemy_big'));
    this.enemies.push(new Enemy(this, 210, -200, 'Enemy_big'));
    this.enemies.push(new Enemy(this, 280, -200, 'Enemy_big'));
    this.enemies.push(new Enemy(this, 350, -200, 'Enemy_big'));
    this.enemies.push(new Enemy(this, 420, -200, 'Enemy_big'));
    this.enemies.push(new Enemy(this, 490, -200, 'Enemy_big'));
    this.enemies.push(new Enemy(this, 560, -200, 'Enemy_big'));
    // this.enemies.push(new Enemy(this, 100, -200, 'Enemy_big' ));
    // this.enemies.push(new Enemy(this, 300, -200, 'Enemy_medium'));
    
    this.enemies.forEach(enemy => {
      (enemy.body as Phaser.Physics.Arcade.Body).allowGravity = false;
      enemy.setVelocityY(70);
      this.physics.add.collider(this.player, enemy, () =>{
        this.addHealth(-10);
        enemy.visible = false;
        enemy.disableBody();
        enemy.destroy();
      });
    });

  }
  update() : void
  {
    if (!this.gameover) 
    {
      this.handleInput();
    }
    if (this.enemies.length > 0) {
      let toDelete : number[] = [];
      for (let i = 0; i < this.enemies.length; i++) {
        if (this.enemies[i].active) {
          this.enemies[i].update();
        }
        else 
        {
          toDelete.push(i);
        } 
      }
      for (const index of toDelete) {
        this.enemies.splice(index,1);
      }
    }
    else
    {
      this.createEnemies();
    } 
    if (this.health <= 0)
    {
      this.gameover = true;  
    } 
  }

  
  /**
   * Instantiate application component.
   */
  public constructor(private http : HttpClient) 
  { 
    super({ key: 'sceneA', active: true });
    
  }
  
  /**
   * Game ready event handler.
   *
   * @param game Game instance.
   */
  public onGameReady(game: Phaser.Game): void {
    this.game = game;
  }


  fkUp : boolean = true;

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
    
    if(!this.fkUp && this.fireKey.isUp)
    {
      //this.http.get('score').subscribe((data : any) => console.log(data.data), (error : HttpErrorResponse) => console.log(error), () => console.log("Accessed!"));
      this.fkUp = true;
      this.http.post("/leaderboard",{ score : this.score }).toPromise().then((res) => {console.log(res)}).catch((error) => {console.log(error)});
    }

    if(this.fireKey.isDown)
    {
      this.fkUp = false;
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
  log()
  {
    console.log(this.name);
  }


  fire(user : Physics.Arcade.Sprite, settings : BulletSettings)
  {
    let newBullet = this.physics.add.sprite(user.x, user.y, 'bullet1');
    newBullet.angle = settings.angle;
    (newBullet.body as Phaser.Physics.Arcade.Body).allowGravity = false;
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
  }
}

export class Enemy extends Phaser.Physics.Arcade.Sprite
{
    health : number = 100;
    bulletSettings : BulletSettings = new BulletSettings(5, 5, new Phaser.Math.Vector2(0,90),10, -90);
    static sceneRef : AppComponent;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | integer) 
    { 
        super(scene, x, y, texture, frame); 
        
        this.scene.physics.add.existing(this.scene.add.existing(this));
        if (Enemy.sceneRef == null) {
          Enemy.sceneRef =  scene as AppComponent;
        }
    }
    setHealth(hp : number)
    {
        this.health = hp;
    }
    clock : number = 0;
    hasFired : boolean = false;
    update() : void
    {
      if (this.y > 0) 
      {
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
      }
      if (this.y > 100 ) {
        this.setVelocity(0);
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
      newBullet.setVelocity(settings.dir.x * settings.speed,settings.dir.y * settings.speed);
      this.scene.physics.add.overlap(newBullet, (this.scene as AppComponent).player, (bullet : Physics.Arcade.Sprite , player :  Physics.Arcade.Sprite) =>{
        Enemy.sceneRef.addHealth(-settings.damage);
        bullet.visible = false;
        bullet.disableBody();
        bullet.destroy();
      });
    }
}