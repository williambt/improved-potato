import { Component } from '@angular/core';

import { environment } from '../environments/environment';
import { start } from 'repl';
import { Physics } from 'phaser';
import { Bullet } from './Bullet'

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
  speed : number = 200;

  preload() : void
  {
    this.load.setBaseURL("../assets");
    
    this.load.image('sky', "sky.png");
    this.load.image('player', "ball.png");
    this.load.image('bullet1', "bullet1.png");
  }
  
  create() : void
  {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    this.player = this.physics.add.sprite(400, 500, 'player');
    this.player.body.allowGravity = false;
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

  }

  update() : void
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
      this.fire();
      /*let bul = this.physics.add.sprite(this.player.body.position.x, this.player.body.position.y, 'bullet1');
      bul.angle = -90;
      bul.body.allowGravity = false;
      bul.setVelocityY(-300);*/
    }

    for(let bul of this.bullets)
    {
    }
  }

  bullets : Bullet[] = [];
  fire()
  {
    let bul = this.physics.add.sprite(this.player.body.position.x, this.player.body.position.y, 'bullet1');
    bul.body.allowGravity = false;
    this.bullets.push(new Bullet(bul, 300, -90));
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
}

function collectStar(player, star : any) : void
{
  console.log(this.platforms);
  star.disableBody(true, true);
}