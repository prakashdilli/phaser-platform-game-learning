import Phaser from "phaser";
import Player from "../entities/Player";

class Play extends Phaser.Scene {

    constructor() {
        super('PlayScene')
    }

    preload() {
    }

    create() {
        const map = this.createMap()
        const layers = this.createLayers(map)  
        
        this.player = this.createPlayer()

        this.playerSpeed = 200
        this.physics.add.collider(this.player,layers.platformColliders)
        
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    createMap() {
        const map = this.make.tilemap({key:'map'}) // key same as in preload title map name
        map.addTilesetImage('main_lev_build_1','title-1') // 1st arg asset name of the image used in the tilemap image, 2nd arg is the key same as in the preload
        map.addTilesetImage('main_lev_build_2','title-2') // 1st arg asset name of the image used in the tilemap image, 2nd arg is the key same as in the preload
        return map;
    }

    createLayers(map) {
        const titleset = map.getTileset('main_lev_build_1')
        const platformColliders =  map.createStaticLayer('platform_colliders',titleset) // 1st arg name of the layer in the tilemap, 2nd arg list of tileset used in that layer
        const environment = map.createStaticLayer('environment',titleset)
        const platform =  map.createStaticLayer('platform',titleset) // 1st arg name of the layer in the tilemap, 2nd arg list of tileset used in that layer

        // platformColliders.setCollisionByExclusion(-1,true)
        platformColliders.setCollisionByProperty({collides:true}) // collision by property

        return { environment,platform,platformColliders }
    }

    createPlayer() {
        // const player = this.physics.add.sprite(100,250,'player')
        const player = new Player(this,100,250)
        player.body.setGravityY(300)
        player.setCollideWorldBounds(true)
        return player;
    }

    update (){ // update methods called 60 times per sec
        const { left, right } = this.cursors

        if(left.isDown){
            this.player.setVelocityX(-this.playerSpeed)
        } else if(right.isDown){
            this.player.setVelocityX(this.playerSpeed)
        }
        else{
            this.player.setVelocityX(0)
        }
    }
}

export default Play;