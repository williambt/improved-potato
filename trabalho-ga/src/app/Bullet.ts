import { Physics, Scene, Scenes } from "phaser";

export class BulletSettings
{
    damage : number;
    speed : number;
    fireRate : number;
    angle : number;
    dir : Phaser.Math.Vector2;
    shouldHitPlayer : boolean;
    constructor(damage: number, speed : number, dir : Phaser.Math.Vector2, fireRate : number, angle : number, shouldHitPlayer: boolean = false) 
    {
        this.damage = damage;
        this.speed = speed;
        this.angle = angle;
        this.dir = dir;
        this.fireRate = fireRate;
        this.shouldHitPlayer = shouldHitPlayer;
    }
}
