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
        
        const player = this.createPlayer()

        this.physics.add.collider(player,layers.platformColliders)
        
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
        return new Player(this,100,250)
    }

}

export default Play;