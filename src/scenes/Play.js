import Phaser from "phaser";
import Player from "../entities/Player";

class Play extends Phaser.Scene {

    constructor(config) {
        super('PlayScene')
        this.config = config
    }

    preload() {

    }

    create() {
        const map = this.createMap()
        const layers = this.createLayers(map)  
        
        const player = this.createPlayer()

        this.createPlayerColliders(player, {
            colliders : {
                platformColliders : layers.platformColliders
            }
        })

        // setup follow up camera
        this.setupFollowupCameraOn(player)
    }

    createMap() {
        const map = this.make.tilemap({key:'map'}) // key same as in preload title map name
        map.addTilesetImage('main_lev_build_1','title-1') // 1st arg asset name of the image used in the tilemap image, 2nd arg is the key same as in the preload
        map.addTilesetImage('main_lev_build_2','title-2') // 1st arg asset name of the image used in the tilemap image, 2nd arg is the key same as in the preload
        return map;
    }

    createLayers(map) {
        const tileset = map.getTileset('main_lev_build_1')
        const platformColliders =  map.createStaticLayer('platform_colliders',tileset) // 1st arg name of the layer in the tilemap, 2nd arg list of tileset used in that layer
        const environment = map.createStaticLayer('environment',tileset)
        const platform =  map.createStaticLayer('platform',tileset) // 1st arg name of the layer in the tilemap, 2nd arg list of tileset used in that layer
        const platformZones =  map.getObjectLayer('player_zones').objects
        debugger    
        // platformColliders.setCollisionByExclusion(-1,true)
        platformColliders.setCollisionByProperty({collides:true}) // collision by property

        return { environment,platform,platformColliders }
    }

    createPlayer() {
        return new Player(this,100,250)
    }

    createPlayerColliders(player, { colliders }) {
        player
            .addCollider(colliders.platformColliders)
    }

    setupFollowupCameraOn(player){
        const {width,height,mapOffset,zoomFactor} = this.config 
        this.cameras.main.startFollow(player)
        this.physics.world.setBounds(0, 0, width + mapOffset, height+200)
        this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor)
    }

}

export default Play;