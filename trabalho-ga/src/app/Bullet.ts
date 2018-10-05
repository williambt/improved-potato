import { Physics } from "phaser";


export class Bullet
{
    bullet : Physics.Arcade.Sprite;
    speed : number;
    angle : number;

    time : number = 0;

    constructor(sprite : Physics.Arcade.Sprite, speed : number, angle? : number) 
    {
        this.speed = speed;
        this.angle = angle;
        this.bullet = sprite;
    }
}