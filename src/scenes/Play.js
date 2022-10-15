import Phaser from "phaser";

class Play extends Phaser.Scene {

    constructor(){
        super('PlayScene')
    }

    preload(){
    }

    create(){
        const map = this.make.tilemap({key:'map'}) // key same as in preload title map name
        const titleset1 = map.addTilesetImage('main_lev_build_1','title-1') // 1st arg asset name of the image used in the tilemap image, 2nd arg is the key same as in the preload
        const titleset2 = map.addTilesetImage('main_lev_build_2','title-2') // 1st arg asset name of the image used in the tilemap image, 2nd arg is the key same as in the preload

        map.createStaticLayer('platform',titleset1) // 1st arg name of the layer in the tilemap, 2nd arg list of tileset used in that layer
        map.createStaticLayer('environment',titleset1)
    }
}

export default Play;