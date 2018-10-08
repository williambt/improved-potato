import { Component } from '@angular/core';

import { environment } from '../environments/environment';
import { Physics } from 'phaser';
import { Bullet, BulletSettings } from './Bullet'
import { Enemy } from './Enemy';
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
    width: 800,
    height: 600,
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

  origin : Physics.Arcade.Sprite;

  bulletSettings : BulletSettings = new BulletSettings(10, new Phaser.Math.Vector2(0,-90),1/3, -90);

  // player stats
  health : number = 100;
  score : number = 0;

  enemies : Physics.Arcade.Sprite[] = [];
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
    this.player.body.allowGravity = false;
    this.player.setCollideWorldBounds(true);
    this.origin = this.physics.add.sprite(this.player.x, this.player.y, 'bullet2');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.precisionMovement = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    this.enemies.push(this.physics.add.sprite(400 , -200, 'Enemy_big')) ;
    this.enemies.push(this.physics.add.sprite(200, -200, 'Enemy_medium'));
    this.enemies.push(this.physics.add.sprite(600, -200, 'Enemy_small'));
    
    this.enemies.forEach(enemy => {
      enemy.body.allowGravity = false;
      enemy.setVelocityY(100);
      this.physics.add.collider(this.player, enemy, () =>{
        enemy.disableBody();
        enemy.visible = false;
        this.health -= 10;
      });
    });

  }

  update() : void
  {
    this.handleInput();
    this.origin.x = this.player.x;
    this.origin.y = this.player.y;
    if (this.bullets.length > 0) 
    {
      for(let bul of this.bullets)
      {
        bul.update();
      }
    }
    if (this.enemies.length > 0) {
      for (const enemy of this.enemies) {
        if (enemy.y > this.gameConfig.height) {
          enemy.y = -100;
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


  bullets : Bullet[] = [];
  fire(user : Physics.Arcade.Sprite, settings : BulletSettings)
  {
    let newBullet = this.physics.add.sprite(user.x, user.y, 'bullet1');
    newBullet.angle = settings.angle;
    newBullet.body.allowGravity = false;
    //newBullet.body.collideWorldBounds = true;
    newBullet.setVelocity(settings.dir.x * settings.speed,settings.dir.y * settings.speed);
    this.physics.add.collider(newBullet, this.enemies, (bullet : Physics.Arcade.Sprite , enemy :  Physics.Arcade.Sprite) =>{
      bullet.disableBody();
      bullet.visible = false;
      enemy.disableBody();
      enemy.visible = false;
      this.score += 10;
    });
    if (settings.shouldHitPlayer) {
      this.physics.add.collider(newBullet, this.player, (bullet : Physics.Arcade.Sprite , player :  Physics.Arcade.Sprite) =>{
        bullet.disableBody();
        bullet.visible = false;
        player.disableBody();
        player.visible = false;
        this.health -= 10;
      });
    }
    this.bullets.push(new Bullet(newBullet, settings)); 
  }
}