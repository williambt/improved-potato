import { Physics } from "phaser";
import {AppComponent} from "./app.component"
export class Enemy extends Physics.Arcade.Sprite
{
    health : number = 100;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | integer) 
    { 
        super(scene, x, y, texture, frame); 

    }
    setHealth(hp : number)
    {
        this.health = hp;
    }
    update() : void
    {
        if (this.y > (this.scene as AppComponent).gameConfig.height) {
            this.y = -100;
          }
        if (this.health < 0) {
            this.disableBody();
        }
    }
}