//This is the beginning of our terrible, awful, no good, very bad game.

class titleScene extends Phaser.Scene{
    constructor() {
        super({key: 'titleScene'});
    }
    preload () {
        this.load.image('background_button', 'img/StartButton.jpg')
    }
    create () {
        let background = this.add.sprite(0, 0, 'background_button');
        background.setOrigin(0,0);
    
    }
}

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
    
}

create(){

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
let TitleScene = new TitleScene('Title');

let game = new Phaser.Game(config);