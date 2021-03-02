//This is the beginning of our terrible, awful, no good, very bad game.

class gameScene extends Phaser.Scene{
    constructor() {
        super({
            key: 'gameScene',
            active: true
        });
 
        this.cursor = new Phaser.Math.Vector2();
 
        this.playerSpeed = 0.1;
        this.enemyMaxY = 280;
        this.enemyMinY = 80;
    }


    preload(){
        this.load.image('earth', 'img/earthPlaceholder.png');
        this.load.image('space', 'img/bgPlaceholder.jpg');
    }

    create(){
        this.add.image(400, 300, 'earth');
        this.add.image(400, 300, 'space');
    }

    update(){
        
    }
}

// our game's configuration
let config = {
    type: Phaser.AUTO, //Phaser will decide how to render our game (WebGL or Canvas)
    width: 640, // game width
    height: 360, // game height
    scene: gameScene, // our newly created scene
    parent: 'main-game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false
        }
    }
};
 
// create the game, and pass it the configuration
let game = new Phaser.Game(config);