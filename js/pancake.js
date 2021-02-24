//This is our awful game

class gameScene extends Phaser.Scene {
  constructor(){
    super({
        key: 'gameScene',
        active: true
    });

    this.cursor = new Phaser.Math.Vector2();
    }

    preload(){
        this.load.image('background', 'img/background.jpg');
        this.load.image('earth', 'img/earth.png');
        this.load.image('asteroid', 'img/asteroid.png');
    }


    create() {
        // background
        let bg = this.add.sprite(0, 0, 'background');

        // change origin to the top-left of the sprite
        bg.setOrigin(0, 0);

        this.asteroid = this.add.sprite(330, 100, 'asteroid');

        this.asteroid.setScale(0.1)

        this.player = this.add.sprite(330, 350, 'earth');

        this.player.setScale(1);
   }

   update(){

   }

}

//our game configuration
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

