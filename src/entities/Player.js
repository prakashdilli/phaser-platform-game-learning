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
        this.playerSpeed = 150
        this.jumpCount = 0
        this.consecutiveJump = 1
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
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space)
        const isUpJustDown = Phaser.Input.Keyboard.JustDown(up)
        const onFloor = this.body.onFloor();

        if (left.isDown) {
            this.setVelocityX(-this.playerSpeed)
            this.setFlipX(true)
        } else if (right.isDown) {
            this.setVelocityX(this.playerSpeed)
            this.setFlipX(false)
        }
        else {
            this.setVelocityX(0)
        }

        if ((isUpJustDown || isSpaceJustDown) && (onFloor || this.jumpCount < this.consecutiveJump)) {
            this.setVelocity(-this.playerSpeed * 2.5)
            this.jumpCount++
        }

        if(onFloor){
            this.jumpCount = 0
        }
        onFloor ? 
            this.body.velocity.x !=0 ? this.play('run',true) : this.play('idle',true) :
        this.play('jump',true)
        
    }
}

export default Player;