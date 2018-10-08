import { Physics } from "phaser";

export class BulletSettings
{
    speed : number;
    fireRate : number;
    angle : number;
    dir : Phaser.Math.Vector2;
    constructor(speed : number, dir : Phaser.Math.Vector2, fireRate : number, angle : number) 
    {
        this.speed = speed;
        this.angle = angle;
        this.dir = dir;
        this.fireRate = fireRate;
    }
}


export class Bullet
{
    bullet : Physics.Arcade.Sprite;
    settings : BulletSettings;
    constructor(bullet : Physics.Arcade.Sprite, settings : BulletSettings) 
    {
        this.settings = settings;
        this.bullet = bullet;
    }
    update()
    {
        // if (!this.bullet.body.onWorldBounds) {
        //     this.bullet.destroy();
        //   }                                         tem que dar um jeito de destruir o objeto quando fora da tela
    }
}