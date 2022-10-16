import Phaser from "phaser";
import initAnimations from "./playerAnims"
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y) {
        super(scene,x,y,'player')

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.init()
        this.initEvents()
    }

    init() {
        this.gravity = 600
        this.playerSpeed = 200
        this.body.setGravityY(this.gravity)
        this.setCollideWorldBounds(true)
        this.cursors = this.scene.input.keyboard.createCursorKeys()
        initAnimations(this.scene.anims)
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update,this)
    }

    update () { // update methods called 60 times per sec
        const { left, right,space,up } = this.cursors
        const onFloor = this.body.onFloor();

        if (left.isDown) {
            this.setVelocityX(-this.playerSpeed)
            this.setFlipX(true)
        } else if (right.isDown) {
            this.setVelocityX(this.playerSpeed)
        }
        else {
            this.setVelocityX(0)
        }

        if ((space.isDown || up.isDown) && onFloor) {
            this.setVelocity(-this.playerSpeed * 1.5)
        }

        this.body.velocity.x !=0 ? this.play('run',true) : this.play('idle',true)
        
    }
}

export default Player;