import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y){
        super(scene,x,y,'player')

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.init()
    }

    init(){
        this.body.setGravityY(300)
        this.setCollideWorldBounds(true)
    }
}

export default Player;