//This is our awful game

class titleScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'titleScene',
            active: true
        });
    }

    preload() {
        this.load.image('background', 'img/background.jpg');
      }
    
      create() {
            // background
            let bg = this.add.sprite(0, 0, 'background');

            // change origin to the top-left of the sprite
        bg.setOrigin(0, 0);
    
        this.add.text(45, 50, 'CODENAME: PANCAKE', { font: '50px Arial', align: 'center' });
    
        this.clickButton = this.add.text(260, 200, 'START!', { fill: '#0f0' })
          .setInteractive()
          .on('pointerover', () => this.enterButtonHoverState() )
          .on('pointerout', () => this.enterButtonRestState() )
          .on('pointerdown', () => this.enterButtonActiveState() )
          .on('pointerup', () => {
            this.enterButtonHoverState();
            this.scene.start('gameScene');
            console.log('Change Scene to game');
        });
    
      }
    
      enterButtonHoverState() {
        this.clickButton.setStyle({ fill: '#ff0' });
      }
    
      enterButtonRestState() {
        this.clickButton.setStyle({ fill: '#0f0' });
      }
    
      enterButtonActiveState() {
        this.clickButton.setStyle({ fill: '#0ff' });
      }

}

class gameScene extends Phaser.Scene {
    constructor(){
        super({
            key: 'gameScene',
        });

        this.cursor = new Phaser.Math.Vector2();
        this.racketSpeed = 0.1;
        this.is_hit = 0;
        this.health = 5;
        this.score = 0;
        this.isScored = false;
        this.racketSpeedUp = false;
        this.asteroidBounceHigh = false;
    }

    makeBar(x, y,color) {
        //draw the bar
        let bar = this.add.graphics();

        //color the bar
        bar.fillStyle(color, 1);

        //fill the bar with a rectangle
        bar.fillRect(0, 0, 200, 30);
        
        //position the bar
        bar.x = x;
        bar.y = y;

        //return the bar
        return bar;
    }
    setValue(bar,percentage) {
        //scale the bar
        bar.scaleX = percentage/100;
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

        this.path = new Phaser.Curves.Path(300, 300);
        this.path.add(new Phaser.Curves.Ellipse(330, 400, 200));
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.earthcircle = new Phaser.Geom.Circle(330, 400, 160);
        this.earth = this.physics.add.staticImage(330, 400, 'earth');
        this.racket = this.physics.add.image(330, 200, 'racket');
        this.racketcircle = new Phaser.Geom.Circle(this.racket.x + 40, this.racket.y, 10);
        this.racketcircle2 = new Phaser.Geom.Circle(this.racket.x + 5, this.racket.y, 10);
        this.racketcircle3 = new Phaser.Geom.Circle(this.racket.x + 60, this.racket.y, 10);
        this.asteroid = this.physics.add.image(400, 50, 'asteroid');
        this.asteroidcircle = new Phaser.Geom.Circle(this.asteroid.x, this.asteroid.y, 30);

        this.physics.accelerateToObject(this.asteroid, this.earth, 60, 300, 300);
    
        this.asteroid.setScale(0.1);

        this.racket.setScale(0.125)

        this.earth.setScale(2);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.racket.setCollideWorldBounds(true);

        this.asteroid.setCollideWorldBounds(true);

        this.health = 5;

        this.healthBar = this.makeBar(10 , 320, 0xe74c3c);
        this.setValue(this.healthBar, this.health*20);

        
        this.add.text(10, 295, 'Health');

        this.scoreText = this.add.text(10, 10, "Score: " + this.score);

        
    }
   

    update(){
        this.graphics.clear();
        // this.graphics.fillCircleShape(this.earthcircle);
        // this.graphics.fillCircleShape(this.asteroidcircle);
        // this.graphics.fillCircleShape(this.racketcircle);
        // this.graphics.fillCircleShape(this.racketcircle2);
        // this.graphics.fillCircleShape(this.racketcircle3);
        
        this.graphics.lineStyle(2, 0xffffff, 1);

        this.path.draw(this.graphics);

       
        this.asteroidcircle.x = this.asteroid.x;
        this.asteroidcircle.y = this.asteroid.y;

        this.racketcircle.x = this.racket.x + 40;
        this.racketcircle.y = this.racket.y + 5;

        this.racketcircle2.x = this.racket.x + 5;
        this.racketcircle2.y = this.racket.y + 5;

        this.racketcircle3.x = this.racket.x + 60;
        this.racketcircle3.y = this.racket.y + 5;

        // this.graphics.strokeCircleShape(this.circle);
        this.racket.body.setVelocityX(0);
        this.racket.body.setVelocityY(0);

        if (Phaser.Geom.Intersects.CircleToCircle(this.earthcircle, this.asteroidcircle)) {
            this.asteroidcircle.y = 0;
            this.asteroid.y = 0;
            this.is_hit = 1;

            if(this.is_hit == 1) {
                this.health = this.health - 1;
                console.log("health: " + this.health);
                //let healthBar=this.makeBar(140,200,0xe74c3c);
                this.setValue(this.healthBar, this.health*20);
                this.is_hit = 0;
            }

            if(this.health == 0) {
                //switch scene
                this.scene.start('endMenu');
                this.score = 0; 
            }

            let damageText = this.add.text(this.earth.x - 10, this.earth.y - 100, "-1", 
            {color: '#f00', fontSize: '30px', fontFamily: 'monoSpace'});
            setTimeout(function() {damageText.destroy()}, 750);
            
        }

        if (Phaser.Geom.Intersects.CircleToCircle(this.racketcircle, this.asteroidcircle) ||
            Phaser.Geom.Intersects.CircleToCircle(this.racketcircle2, this.asteroidcircle) ||
            Phaser.Geom.Intersects.CircleToCircle(this.racketcircle3, this.asteroidcircle)) {

            this.asteroid.setVelocityY(-150);

            if(!this.isScored) {
                this.score+=5;
                this.scoreText.setText( "Score: " + this.score);
                console.log("Add 5 to Score");
                this.isScored = true;
            }            
        } else if (Phaser.Geom.Intersects.CircleToCircle(this.racketcircle, this.asteroidcircle) && this.asteroidBounceHigh ||
        Phaser.Geom.Intersects.CircleToCircle(this.racketcircle2, this.asteroidcircle) && this.asteroidBounceHigh ||
        Phaser.Geom.Intersects.CircleToCircle(this.racketcircle3, this.asteroidcircle) && this.asteroidBounceHigh) {
            
            this.asteroid.setVelocityY(-500);

            if(!this.isScored) {
                this.score+=5;
                this.scoreText.setText( "Score: " + this.score);
                console.log("Add 5 to Score");
                this.isScored = true;
            }
        }

        if(this.asteroid.y <= 150 && this.isScored == true) {
            this.isScored = false;
            console.log(this.asteroid.y);
        }

        if (this.cursors.left.isDown && this.racketSpeedUp) {
            this.racket.setVelocityX(-500);
        }
        
        else if (this.cursors.right.isDown && this.racketSpeedUp) {
            this.racket.setVelocityX(500);
        }
        
        else if (this.cursors.left.isDown) {
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

        if (this.cursors.up.isDown) {
            this.racketSpeedUp = !this.racketSpeedUp;
        }

        if (this.cursors.down.isDown) {
            this.asteroidBounceHigh = !this.asteroidBounceHigh;
            if(this.asteroidBounceHigh) {
                console.log("Asteroid Bounce Powerup Activated")
            }
            if(!this.asteroidBounceHigh) {
                console.log("Asteroid Bounce Powerup Deactivated")
            }
        }
    }
}

class endMenu extends Phaser.Scene {
    constructor() {
        super({key: 'endMenu'});
    }
  
    preload() {
        this.load.image('background', 'img/background.jpg');
    }

    create() {
        // background
        let bg = this.add.sprite(0, 0, 'background');

        // change origin to the top-left of the sprite
        bg.setOrigin(0, 0);

    this.add.text(45, 50, 'GAME OVER', { font: '50px Arial', align: 'center' });

    this.clickButton = this.add.text(260, 200, 'PLAY AGAIN!', { fill: '#0f0' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverState() )
      .on('pointerout', () => this.enterButtonRestState() )
      .on('pointerdown', () => this.enterButtonActiveState() )
      .on('pointerup', () => {
        this.enterButtonHoverState();
        this.scene.start('gameScene');
        console.log('Change Scene to game');
    });

    }

    enterButtonHoverState() {
        this.clickButton.setStyle({ fill: '#ff0' });
    }

    enterButtonRestState() {
        this.clickButton.setStyle({ fill: '#0f0' });
    }

    enterButtonActiveState() {
        this.clickButton.setStyle({ fill: '#0ff' });
    }
}

//our game configuration
let config = {
    type: Phaser.AUTO, //Phaser will decide how to render our game (WebGL or Canvas)
    width: 640, // game width
    height: 360, // game height
    scene: [titleScene, gameScene, endMenu], // our newly created scene
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

