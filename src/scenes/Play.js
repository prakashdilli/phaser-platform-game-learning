import Phaser from "phaser";

class Play extends Phaser.Scene {

    constructor(){
        super('PlayScene')
    }

    preload(){
    }

    create(){
        const map = this.createMap()
        const layers = this.createLayers(map)
       
    }

    createMap(){
        const map = this.make.tilemap({key:'map'}) // key same as in preload title map name
        map.addTilesetImage('main_lev_build_1','title-1') // 1st arg asset name of the image used in the tilemap image, 2nd arg is the key same as in the preload
        map.addTilesetImage('main_lev_build_2','title-2') // 1st arg asset name of the image used in the tilemap image, 2nd arg is the key same as in the preload
        return map;
    }

    createLayers(map){
        const titleset = map.getTileset('main_lev_build_1')
        const environment = map.createStaticLayer('environment',titleset)
        const platform =  map.createStaticLayer('platform',titleset) // 1st arg name of the layer in the tilemap, 2nd arg list of tileset used in that layer
        return { environment,platform }
    }
}

export default Play;