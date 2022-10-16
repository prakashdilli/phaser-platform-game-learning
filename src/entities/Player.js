import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y) {
        super(scene,x,y,'player')

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.init()
    }

    init() {
        this.gravity = 500
        this.playerSpeed = 200
        this.body.setGravityY(this.gravity)
        this.setCollideWorldBounds(true)
        this.cursors = this.scene.input.keyboard.createCursorKeys()
    }

    preUpdate (time,delta) { // update methods called 60 times per sec
        super.preUpdate(time,delta)
        const { left, right } = this.cursors

        if(left.isDown){
            this.setVelocityX(-this.playerSpeed)
        } else if(right.isDown){
            this.setVelocityX(this.playerSpeed)
        }
        else{
            this.setVelocityX(0)
        }
    }
}

export default Player;