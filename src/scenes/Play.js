import Phaser from "phaser";
import Birdman from "../entities/Birdman";
import Player from "../entities/Player";
import Enemies from "../groups/Enemies";
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
        const playerZones = this.getPlayerZones(layers.platformZones)
        const player = this.createPlayer(playerZones)
        const enemies = this.createEnemies(layers.enemySpawns)

        this.createPlayerColliders(player, {
            colliders : {
                platformColliders : layers.platformColliders
            }
        })

        this.createEnemyColliders(enemies, {
            colliders : {
                platformColliders : layers.platformColliders,
                player : player
            }
        })

        // setup follow up camera
        this.setupFollowupCameraOn(player)

        // setup the end zone for the level
        this.createEndZone(playerZones.end,player)
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
        const platformZones =  map.getObjectLayer('player_zones')
        const enemySpawns =  map.getObjectLayer('enemy_spawns')
        // platformColliders.setCollisionByExclusion(-1,true)
        platformColliders.setCollisionByProperty({collides:true}) // collision by property

        return { environment,platform,platformColliders,platformZones,enemySpawns }
    }

    createPlayer({start}) {
        return new Player(this,start.x,start.y)
    }

    createEnemies(enemySpawnsLayer) {
        const enemySpawns = enemySpawnsLayer.objects
        const enemies = new Enemies(this)
        const enemyTypes = enemies.getTypes()
        debugger
        enemySpawns.map(enemy =>  { 
            const type = enemy.properties.find(prop => prop.name === 'Type1')
            const enemyType = type?type['value']:'Birdman'
            enemies.add(new enemyTypes[enemyType](this,enemy.x,enemy.y))
        } )

        return enemies;
       
    }

    createPlayerColliders(player, { colliders }) {
        player
            .addCollider(colliders.platformColliders)
    }

    createEnemyColliders(birdmans, { colliders }) {
        birdmans
            .addCollider(colliders.platformColliders)
            .addCollider(colliders.player)
    }

    setupFollowupCameraOn(player){
        const {width,height,mapOffset,zoomFactor} = this.config 
        this.cameras.main.startFollow(player)
        this.physics.world.setBounds(0, 0, width + mapOffset, height+200)
        this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor)
    }

    getPlayerZones(playerZonesLayer) {
        const playerZones = playerZonesLayer.objects
        return {
            start : playerZones.find(zone => zone.name === 'startZone'),
            end : playerZones.find(zone => zone.name === 'endZone')
        }
    }

    createEndZone(endZone,player){
        const endOfLevel = this.physics.add.sprite(endZone.x,endZone.y,'end')
            .setSize(5, this.config.height * 2)
            .setAlpha(0)
            .setOrigin(0.5,1)

        const eolOverlap = this.physics.add.overlap(player,endOfLevel, ()=>{
            eolOverlap.active = false;
            console.log('player crossed the end zone')
        })
    }

}

export default Play;