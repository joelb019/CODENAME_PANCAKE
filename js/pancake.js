//This is our awful game

class gameScene extends Phaser.Scene {
  constructor(){
    super({
        key: 'gameScene',
        active: true
    });

    this.cursor = new Phaser.Math.Vector2();
    this.racketSpeed = 0.1;
    this.is_hit = 0;

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

        this.graphics = this.add.graphics({ fillStyle: { color: 0xaa0000} });
        this.earthcircle = new Phaser.Geom.Circle(330, 400, 160);
        this.earth = this.physics.add.staticImage(330, 400, 'earth');
        this.asteroid = this.physics.add.image(400, 50, 'asteroid');
        this.asteroidcircle = new Phaser.Geom.Circle(this.asteroid.x, this.asteroid.y, 30);
        this.racket = this.physics.add.image(330, 200, 'racket');
        this.racketcircle = new Phaser.Geom.Circle(this.racket.x + 40, this.racket.y, 10);

        this.physics.accelerateToObject(this.asteroid, this.earth, 60, 300, 300);
    
        this.asteroid.setScale(0.1);

        this.racket.setScale(0.125)

        this.earth.setScale(2);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.racket.setCollideWorldBounds(true);

        this.asteroid.setCollideWorldBounds(true);

    }
   

   update(){
    this.graphics.clear();
    this.graphics.fillCircleShape(this.earthcircle);
    this.graphics.fillCircleShape(this.asteroidcircle);
    this.graphics.fillCircleShape(this.racketcircle);
    
    this.asteroidcircle.x = this.asteroid.x;
    this.asteroidcircle.y = this.asteroid.y;

    this.racketcircle.x = this.racket.x + 40;
    this.racketcircle.y = this.racket.y;

    // this.graphics.strokeCircleShape(this.circle);
    this.racket.body.setVelocityX(0);
    this.racket.body.setVelocityY(0);

    if (Phaser.Geom.Intersects.CircleToCircle(this.earthcircle, this.asteroidcircle)) {
        this.asteroid.destroy();
        this.asteroidcircle.y = 1000;
        // this.asteroid.setVelocityX(0);
        // this.asteroid.setVelocityY(0);
        this.is_hit = 1;

        }

    if (Phaser.Geom.Intersects.CircleToCircle(this.racketcircle, this.asteroidcircle)) {
    this.asteroid.setVelocityY(-150);

    }

    if (this.cursors.left.isDown) {
        // this.angle += this.racketSpeed;
        // this.racket.setVelocityX(radius * Math.cos(angle * (Math.PI/180)) + circleCenterX);
        // this.racket.setVelocityY(radius * Math.sin(angle * (Math.PI/180)) + circleCenterY);
        this.racket.setVelocityX(-150);
      } 
      
    else if (this.cursors.right.isDown) {
        this.racket.setVelocityX(150);

    

   }

   if(this.is_hit == 0){
   this.physics.accelerateToObject(this.asteroid, this.earth, 60, 300, 300);

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

