import Phaser from "phaser";

class Preload extends Phaser.Scene {

    constructor(){
        super('PreloadScene')
    }

    preload(){
        this.load.image('sky','assets/sky.png');
    }

    create(){
        this.scene.start('PlayScene')
    }
}

export default Preload;