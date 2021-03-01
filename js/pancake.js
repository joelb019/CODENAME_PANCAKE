//This is our awful game

class gameScene extends Phaser.Scene {
  constructor(){
    super({
        key: 'gameScene',
        active: true
    });

    this.cursor = new Phaser.Math.Vector2();

    this.racketSpeed = 0.1;
    }

    preload(){
        this.load.image('background', 'img/background.jpg');
        this.load.image('earth', 'img/earth.png');
        this.load.image('asteroid', 'img/asteroid.png');
        this.load.image('racket', 'img/tennis.png');
    }


    create() {


        // background
        let bg = this.add.sprite(0, 0, 'background');

        // change origin to the top-left of the sprite
        bg.setOrigin(0, 0);

        // var circle = new Phaser.Geom.Circle(100, 100, 15);
        // graphics.fillCircleShape(circle);
        
        var earth = this.physics.add.staticImage(330, 400, 'earth');
        var asteroid = this.physics.add.image(330, 100, 'asteroid');
        this.racket = this.physics.add.image(330, 200, 'racket');
        

        this.physics.accelerateToObject(asteroid, earth, 60, 300, 300);

        
        // this.asteroid = this.add.sprite(330, 100, 'asteroid');

        asteroid.setScale(0.1);

        this.racket.setScale(0.125)

        // this.player = this.add.sprite(330, 350, 'earth');

        earth.setScale(2);

        // this.cursors = this.input.keyboard.addKeys(
        //     {up:Phaser.Input.Keyboard.KeyCodes.W,
        //     down:Phaser.Input.Keyboard.KeyCodes.S,
        //     left:Phaser.Input.Keyboard.KeyCodes.A,
        //     right:Phaser.Input.Keyboard.KeyCodes.D});

        this.cursors = this.input.keyboard.createCursorKeys();

        this.racket.setCollideWorldBounds(true);

    }
   

   update(){
    
    this.racket.body.setVelocityX(0);
    this.racket.body.setVelocityY(0);

    if (this.cursors.left.isDown) {
        this.racket.setVelocityX(-150)
      } 
      
    else if (this.cursors.right.isDown) {
        this.racket.setVelocityX(150);
   }

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

