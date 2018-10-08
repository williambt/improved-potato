import { Physics } from "phaser";

export class Enemy
{
    enemyObject : Physics.Arcade.Sprite

    constructor(enemyRef : Physics.Arcade.Sprite)
    {
        this.enemyObject = enemyRef;
    }
    update() : void
    {

    }
}