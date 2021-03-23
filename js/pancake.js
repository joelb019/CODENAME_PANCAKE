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
        this.bounced = false;
        this.racketSpeedUp = false;
        this.asteroidBounceHigh = false;
        this.keyA;
        this.keyS;
        this.keyD;
        this.keyW;
        this.keyShift;
        this.asteroid1hit = false;
        this.asteroid2hit = false;
        this.asteroid3hit = false;
        this.asteroid4hit = false;
        this.asteroid5hit = false;
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
        this.load.image('explosion', 'img/explosion.png');
        this.load.image('earthExplosion', 'img/earthExplosion.png');
        this.load.image('UFO', 'img/ufo.png');
        this.load.image('nuke', 'img/nuke.png');
    }


    create() {

        // background
        let bg = this.add.sprite(0, 0, 'background');

        // change origin to the top-left of the sprite
        bg.setOrigin(0, 0);

        this.graphics = this.add.graphics({ fillStyle: { color: 0xaa0000} });
        this.earth = this.physics.add.staticImage(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'earth');
        this.earthcircle = new Phaser.Geom.Circle(this.earth.x, this.earth.y, 160);
        this.racket = this.physics.add.image(this.earth.x, this.earth.y - 200, 'racket');
        this.racketrect = new Phaser.Geom.Rectangle(this.racket.x -5, this.racket.y - 10, 80, 20);

        this.asteroid1 = this.physics.add.image(400, -100, 'asteroid');
        this.asteroid2 = this.physics.add.image(-400, 500, 'asteroid');
        this.asteroid3 = this.physics.add.image(-500, -200, 'asteroid');
        this.asteroid4 = this.physics.add.image(600, -300, 'asteroid');
        this.asteroid5 = this.physics.add.image(100, -400, 'asteroid');


        this.spaceship1 = this.physics.add.image(400, -200, 'UFO');
        this.spaceship2 = this.physics.add.image(400, -200, 'UFO');
        this.spaceship3 = this.physics.add.image(400, -200, 'UFO');
        this.spaceship4 = this.physics.add.image(400, -200, 'UFO');
        this.spaceship5 = this.physics.add.image(400, -200, 'UFO');

        this.bomb1 = this.physics.add.image(400, -300, 'nuke');
        this.bomb2 = this.physics.add.image(400, -300, 'nuke');
        this.bomb3 = this.physics.add.image(400, -300, 'nuke');
        this.bomb4 = this.physics.add.image(400, -300, 'nuke');
        this.bomb5 = this.physics.add.image(400, -300, 'nuke');

        this.asteroid1circle = new Phaser.Geom.Circle(this.asteroid1.x, this.asteroid1.y, 30);
        this.asteroid2circle = new Phaser.Geom.Circle(this.asteroid2.x, this.asteroid2.y, 30);
        this.asteroid3circle = new Phaser.Geom.Circle(this.asteroid3.x, this.asteroid3.y, 30);
        this.asteroid4circle = new Phaser.Geom.Circle(this.asteroid4.x, this.asteroid4.y, 30);
        this.asteroid5circle = new Phaser.Geom.Circle(this.asteroid5.x, this.asteroid5.y, 30);

        this.spaceship1circle = new Phaser.Geom.Circle(this.spaceship1.x, this.spaceship1.y, 30);
        this.spaceship2circle = new Phaser.Geom.Circle(this.spaceship2.x, this.spaceship2.y, 30);
        this.spaceship3circle = new Phaser.Geom.Circle(this.spaceship3.x, this.spaceship3.y, 30);
        this.spaceship4circle = new Phaser.Geom.Circle(this.spaceship4.x, this.spaceship4.y, 30);
        this.spaceship5circle = new Phaser.Geom.Circle(this.spaceship5.x, this.spaceship5.y, 30);

        this.bomb1circle = new Phaser.Geom.Circle(this.bomb1.x, this.bomb1.y, 30);
        this.bomb2circle = new Phaser.Geom.Circle(this.bomb2.x, this.bomb2.y, 30);
        this.bomb3circle = new Phaser.Geom.Circle(this.bomb3.x, this.bomb3.y, 30);
        this.bomb4circle = new Phaser.Geom.Circle(this.bomb4.x, this.bomb4.y, 30);
        this.bomb5circle = new Phaser.Geom.Circle(this.bomb5.x, this.bomb5.y, 30);

        this.rotatecircle = new Phaser.Geom.Circle(this.earth.x, this.earth.y + 10, 200);
        this.circlecenterx = this.rotatecircle.x;
        this.circlecentery = this.rotatecircle.y;
        this.radius = this.rotatecircle.radius;
        this.angle = 4.60;
        this.racket.angle = this.racket.x/360;

        this.physics.accelerateToObject(this.asteroid1, this.earth, 60, 300, 300);
        // this.physics.accelerateToObject(this.asteroid2, this.earth, 30, 300, 300);
        // this.physics.accelerateToObject(this.asteroid3, this.earth, 70, 300, 300);
        // this.physics.accelerateToObject(this.asteroid4, this.earth, 50, 300, 300);
        // this.physics.accelerateToObject(this.asteroid5, this.earth, 40, 300, 300);

    
        this.asteroid1.setScale(0.1);
        this.asteroid2.setScale(0.1);
        this.asteroid3.setScale(0.1);
        this.asteroid4.setScale(0.1);
        this.asteroid5.setScale(0.1);

        this.spaceship1.setScale(0.1);
        this.spaceship2.setScale(0.1);
        this.spaceship3.setScale(0.1);
        this.spaceship4.setScale(0.1);
        this.spaceship5.setScale(0.1);


        this.racket.setScale(0.125)

        this.earth.setScale(2);

        this.cursors = this.input.keyboard.createCursorKeys();

        // this.racket.setCollideWorldBounds(true);

        //this.asteroid.setCollideWorldBounds(true);

        this.health = 5;

        this.healthBar = this.makeBar(10 , this.sys.game.config.height - 50, 0xe74c3c);
        this.setValue(this.healthBar, this.health*20);

        
        this.add.text(10, this.healthBar.y - 30, 'Health');

        this.scoreText = this.add.text(10, 10, "Score: " + this.score);
        this.scoreText.setFontSize(40);

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    } //end of create

    
   
    rotate(a) {
        // if(this.circlecentery + this.radius * Math.sin(a) < 347) {
                this.racket.x = (this.circlecenterx + this.radius * Math.cos(a)); // <-- that's the maths you need
                this.racket.y = (this.circlecentery + this.radius * Math.sin(a));
        }

    earthcollision(enemyhitbox, enemy){
            
        if (Phaser.Geom.Intersects.CircleToCircle(this.earthcircle, enemyhitbox)) {
            let explo = this.add.sprite(enemy.x, enemy.y, 'explosion');
            explo.setScale(0.75);
            setTimeout(function() {explo.destroy()}, 500);

            enemy.y =(Math.random() * (900 - -500) + -500);
            enemy.x =(Math.random()* (1000 - -100) + -100);
            this.is_hit = 1;

            if(this.is_hit == 1) {
                enemy.body.setVelocityX(0);
                enemy.body.setVelocityY(0);
                this.health = this.health - 1;
                console.log("health: " + this.health);
                //let healthBar=this.makeBar(140,200,0xe74c3c);
                this.setValue(this.healthBar, this.health*20);
                this.is_hit = 0;
            }

            if(this.health == 0) {
                //switch scene
                let earthExplo = this.add.sprite(this.earth.x, this.earth.y, 'earthExplosion');
                earthExplo.setScale(5);
                setTimeout(function(){earthExplo.destroy()}, 750);
                this.scene.start('endMenu');
                this.score = 0; 
            }

            let damageText = this.add.text(this.earth.x - 10, this.earth.y - 100, "-1", 
            {color: '#f00', fontSize: '30px', fontFamily: 'monoSpace'});
            setTimeout(function() {damageText.destroy()}, 750);
            
        }
    }

    racketcollision(enemyhitbox, enemy, hasbeenhit){
        if (Phaser.Geom.Intersects.CircleToRectangle(enemyhitbox, this.racketrect) && hasbeenhit == false)
            {

            // enemy.setVelocityY(-1 * enemy.body.velocity.y);
            // enemy.setVelocityX(-1 * enemy.body.velocity.x);
            enemy.setVelocityY(-1 * enemy.body.velocity.y);
            enemy.setVelocityX(-1 * enemy.body.velocity.x);
            console.log("Hello!");
            hasbeenhit = true;
            

            if(!this.isScored) {
                this.score+=5;
                this.scoreText.setText( "Score: " + this.score);
                console.log("Add 5 to Score");
                this.isScored = true;
            }   
        } 
        
        // } else if (Phaser.Geom.Intersects.CircleToRectangle(this.asteroidcircle, this.racketrect) && this.asteroidBounceHigh)
    
        // {
            
        //     this.asteroid.setVelocityY(-500);

        //     if(!this.isScored) {
        //         this.score+=5;
        //         this.scoreText.setText( "Score: " + this.score);
        //         console.log("Add 5 to Score");
        //         this.isScored = true;
        //     }
        // }

        if(enemy.y <= 150 && this.isScored == true) {
            this.isScored = false;
        }
 

    }

    update(){

        this.graphics.clear();
        this.graphics.fillRectShape(this.racketrect);

        this.racketrect.x = this.racket.x - 10;
        this.racketrect.y = this.racket.y - 5;

        this.asteroid1circle.x = this.asteroid1.x;
        this.asteroid1circle.y = this.asteroid1.y;

        this.asteroid2circle.x = this.asteroid2.x;
        this.asteroid2circle.y = this.asteroid2.y;

        this.asteroid3circle.x = this.asteroid3.x;
        this.asteroid3circle.y = this.asteroid3.y;

        this.asteroid4circle.x = this.asteroid4.x;
        this.asteroid4circle.y = this.asteroid4.y;

        this.asteroid5circle.x = this.asteroid5.x;
        this.asteroid5circle.y = this.asteroid5.y;

        this.spaceship1circle.x = this.spaceship1.x;
        this.spaceship1circle.y = this.spaceship1.y;

        this.spaceship2circle.x = this.spaceship2.x;
        this.spaceship2circle.y = this.spaceship2.y;

        this.spaceship3circle.x = this.spaceship3.x;
        this.spaceship3circle.y = this.spaceship3.y;

        this.spaceship4circle.x = this.spaceship4.x;
        this.spaceship4circle.y = this.spaceship4.y;

        this.spaceship5circle.x = this.spaceship5.x;
        this.spaceship5circle.y = this.spaceship5.y;

        this.bomb1circle.x = this.bomb1.x;
        this.bomb1circle.y = this.bomb1.y;

        this.bomb2circle.x = this.bomb2.x;
        this.bomb2circle.y = this.bomb2.y;

        this.bomb3circle.x = this.bomb3.x;
        this.bomb3circle.y = this.bomb3.y;

        this.bomb4circle.x = this.bomb4.x;
        this.bomb4circle.y = this.bomb4.y;

        this.bomb5circle.x = this.bomb5.x;
        this.bomb5circle.y = this.bomb5.y;


        this.racket.body.setVelocityX(0);
        this.racket.body.setVelocityY(0);

        if (this.cursors.left.isDown) {
            if(this.keyShift.isDown) {
                this.rotate(this.angle);
                this.angle = (this.angle - 20/360 - Math.PI / 360) % (Math.PI * 2);
            } else {
                this.rotate(this.angle);
                this.angle = (this.angle - 5/360 - Math.PI / 360) % (Math.PI * 2);
            }
        }
        if (this.cursors.right.isDown) {
            if(this.keyShift.isDown) {
                this.rotate(this.angle);
                this.angle = (this.angle + 20/360 + Math.PI / 360) % (Math.PI * 2);

            } else {
                this.rotate(this.angle);
                this.angle = (this.angle + 5/360 + Math.PI / 360) % (Math.PI * 2);
               
            }
        }


        this.earthcollision(this.asteroid1circle, this.asteroid1);
        this.earthcollision(this.asteroid2circle, this.asteroid2);
        this.earthcollision(this.asteroid3circle, this.asteroid3);
        this.earthcollision(this.asteroid4circle, this.asteroid4);
        this.earthcollision(this.asteroid5circle, this.asteroid5);

        console.log(this.asteroid1hit);
        this.racketcollision(this.asteroid1circle, this.asteroid1, this.asteroid1hit);
        this.racketcollision(this.asteroid2circle, this.asteroid2, this.asteroid2hit);
        this.racketcollision(this.asteroid3circle, this.asteroid3, this.asteroid3hit);
        this.racketcollision(this.asteroid4circle, this.asteroid4, this.asteroid4hit);
        this.racketcollision(this.asteroid5circle, this.asteroid5, this.asteroid5hit);

        

        this.physics.accelerateToObject(this.asteroid1, this.earth, 40, 300, 300);
        // this.physics.accelerateToObject(this.asteroid2, this.earth, 40, 300, 300);
        // this.physics.accelerateToObject(this.asteroid3, this.earth, 40, 300, 300);
        // this.physics.accelerateToObject(this.asteroid4, this.earth, 40, 300, 300);
        // this.physics.accelerateToObject(this.asteroid5, this.earth, 40, 300, 300);
        

        if(this.keyA.isDown) {
            console.log('A key pressed');
        } 
        if(this.keyS.isDown) {
            console.log('S key pressed');
        } 
        if(this.keyD.isDown) {
            console.log('D key pressed');
        } 
        if(this.keyW.isDown) {
            console.log('W key pressed');
        }
        if(this.keyShift.isDown) {
            console.log('Shift key pressed')
        }
        //console.log(this.angle);
        // console.log(this.asteroid1.x);
        // console.log(this.asteroid1.y);
    } //end of update
} //end of GameScene

class pauseMenu extends Phaser.Scene {
    constructor() {
        super({key: 'pauseMenu'})
    }
    preload() {
        this.load.image('background', 'img/background.jpg');
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

    create() {
        // background
        this.healthBar = this.makeBar(450 , 0, 'background');
    
    this.clickButton = this.add.text(270, 150, 'RESUME!', { fill: '#0f0' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverState() )
      .on('pointerout', () => this.enterButtonRestState() )
      .on('pointerdown', () => this.enterButtonActiveState() )
      .on('pointerup', () => {
        this.enterButtonHoverState();
        

        this.scene.stop();
        this.scene.resume('gameScene');
                
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
    width: 1280, // game width
    height: 720, // game height
    scene: [titleScene, gameScene, endMenu, pauseMenu], // our newly created scene
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

