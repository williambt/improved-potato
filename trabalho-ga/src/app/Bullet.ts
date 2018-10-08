import { Physics, Scene, Scenes } from "phaser";

export class BulletSettings
{
    speed : number;
    fireRate : number;
    angle : number;
    dir : Phaser.Math.Vector2;
    shouldHitPlayer : boolean;
    constructor(speed : number, dir : Phaser.Math.Vector2, fireRate : number, angle : number, shouldHitPlayer: boolean = false) 
    {
        this.speed = speed;
        this.angle = angle;
        this.dir = dir;
        this.fireRate = fireRate;
        this.shouldHitPlayer = shouldHitPlayer;
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
                                             //  tem que dar um jeito de destruir o objeto quando fora da tela
    }
}