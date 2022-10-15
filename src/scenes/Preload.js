import Phaser from "phaser";

class Preload extends Phaser.Scene {

    constructor(){
        super('PreloadScene')
    }

    preload(){
        this.load.tilemapTiledJSON('map','assets/crystal_world_map_my.json')
        this.load.image('title-1','assets/main_lev_build_1.png')
        this.load.image('title-2','assets/main_lev_build_2.png')
    }

    create(){
        this.scene.start('PlayScene')
    }
}

export default Preload;