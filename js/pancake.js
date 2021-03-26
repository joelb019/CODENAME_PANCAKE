//This is our awful game

var gamemusic;
var menumusic;
var econtact;
var rcontact;
var rloss;
var lowhealth;

class titleScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'titleScene',
            active: true
        });
    }

    preload() {
        this.load.image('background', 'img/background.jpg');
        this.load.audio('menumusic', 'sound/MainMenu.mp3');
        this.load.audio('InGame', 'sound/InGame.mp3')
      }
    
      create() {
            // background
            let bg = this.add.sprite(0, 0, 'background');

            menumusic = this.sound.add('menumusic');
            menumusic.play();

            // change origin to the top-left of the sprite
        bg.setOrigin(0, 0);
    
        this.add.text(380, 50, 'APOCALYPSE BOUNCE', { font: '50px Arial', align: 'center' });
    
        this.clickButton = this.add.text(600, 350, 'START!', { font: '25px Arial', fill: '#0f0' })
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
        this.health = 10;
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
        this.accelerate = false

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
        this.load.audio('InGame', 'sound/InGame.mp3');
        this.load.audio('econtact', 'sound/CometEarthContact.mp3');
        this.load.audio('rcontact', 'sound/CometRacketContact.mp3');
        this.load.audio('rloss', 'sound/RoundLoss.mp3')
        this.load.audio('lowhealth', 'sound/LowHealth.mp3')
    }


    create() {

        // background
        let bg = this.add.sprite(0, 0, 'background');

        menumusic.stop();
        gamemusic = this.sound.add('InGame');
        gamemusic.play();

        this.Wave1 = false;
        this.Wave2 = false;
        this.Wave3 = false;
        this.Wave4 = false;
        this.Wave5 = false;
        this.Wave6 = false;

        // change origin to the top-left of the sprite
        bg.setOrigin(0, 0);

        this.graphics = this.add.graphics({ fillStyle: { color: 0xaa0000} });
        this.earth = this.physics.add.staticImage(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'earth');
        this.earthcircle = new Phaser.Geom.Circle(this.earth.x, this.earth.y, 160);
        this.racket = this.physics.add.image(this.earth.x, this.earth.y - 200, 'racket');
        this.racketrect = new Phaser.Geom.Rectangle(this.racket.x -5, this.racket.y - 10, 80, 20);
        this.earthsquare = new Phaser.Geom.Rectangle(this.earth.x - 220, this.earth.y - 200, 500, 420);

        this.clickButton = this.add.text(1150, 10, 'PAUSE', {  font: '25px Arial', fill: '#0f0' })
        .setInteractive()
      .on('pointerup', () => {
          
        if (this.is_hit == 1) {
            econtact.pause();
        }
          gamemusic.pause();
          this.scene.pause('gameScene');
          this.scene.launch('pauseMenu')

            
        
        
    });

        this.asteroid1 = this.physics.add.image(400, -100, 'asteroid');
        this.asteroid2 = this.physics.add.image(1300, 900, 'asteroid');
        this.asteroid3 = this.physics.add.image(-500, -200, 'asteroid');
        this.asteroid4 = this.physics.add.image(600, -300, 'asteroid');
        this.asteroid5 = this.physics.add.image(100, -400, 'asteroid');

        this.asteroid1hit = false;
        this.asteroid2hit = false;
        this.asteroid3hit = false;
        this.asteroid4hit = false;
        this.asteroid5hit = false;


        this.spaceship1 = this.physics.add.image(400, -200, 'UFO');
        this.spaceship2 = this.physics.add.image(400, -200, 'UFO');
        this.spaceship3 = this.physics.add.image(400, -200, 'UFO');
        this.spaceship4 = this.physics.add.image(400, -200, 'UFO');
        this.spaceship5 = this.physics.add.image(400, -200, 'UFO');

        this.spaceship1hit = false;
        this.spaceship2hit = false;
        this.spaceship3hit = false;
        this.spaceship4hit = false;
        this.spaceship5hit = false;

        this.bomb1 = this.physics.add.image(400, -300, 'nuke');
        this.bomb2 = this.physics.add.image(400, -300, 'nuke');
        this.bomb3 = this.physics.add.image(400, -300, 'nuke');
        this.bomb4 = this.physics.add.image(400, -300, 'nuke');
        this.bomb5 = this.physics.add.image(400, -300, 'nuke');

        this.bomb1hit = false;
        this.bomb2hit = false;
        this.bomb3hit = false;
        this.bomb4hit = false;
        this.bomb5hit = false;

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

        

        //this.physics.accelerateToObject(this.asteroid1, this.earth, 70, 300, 300);
        // this.physics.accelerateToObject(this.asteroid2, this.earth, 70, 300, 300);
        // this.physics.accelerateToObject(this.asteroid3, this.earth, 70, 300, 300);
        // this.physics.accelerateToObject(this.asteroid4, this.earth, 70, 300, 300);
        // this.physics.accelerateToObject(this.asteroid5, this.earth, 70, 300, 300);

    
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

        this.health = 10;

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

    resetenemyposition(enemy){

        enemy.body.velocity.x = 0;
        enemy.body.velocity.y = 0;

        this.y = Math.random();

        if (this.y > 0.5){
            enemy.y = (Math.random() * (-160 - -60) + -160);
        }

        else if(this.y <= 0.5){
            enemy.y = (Math.random() * (790 - 890) + 790);
        }

        this.x = Math.random();

        if(this.x >= 0.5){
            enemy.x =(Math.random()* (1450 - 1550) + 1450);
        }

        else if(this.x < 0.5){
            enemy.x =(Math.random() * (-160 - -60) + -160);
        }
       
        // this.asteroid1 = this.physics.add.image(400, -100, 'asteroid');
        // this.asteroid2 = this.physics.add.image(1300, 900, 'asteroid');
        // this.asteroid3 = this.physics.add.image(-500, -200, 'asteroid');
        // this.asteroid4 = this.physics.add.image(600, -300, 'asteroid');
        // this.asteroid5 = this.physics.add.image(100, -400, 'asteroid');
    }
   
    rotate(a) {
        // if(this.circlecentery + this.radius * Math.sin(a) < 347) {
                this.racket.x = (this.circlecenterx + this.radius * Math.cos(a)); // <-- that's the maths you need
                this.racket.y = (this.circlecentery + this.radius * Math.sin(a));
        }


    earthcollision(enemyhitbox, enemy){
        // x : (-120 -> -20)-> (1300 -> 1400)  y: (-120 -> -20) -> (740 - 840)
        if (Phaser.Geom.Intersects.CircleToCircle(this.earthcircle, enemyhitbox)) {
            let explo = this.add.sprite(enemy.x, enemy.y, 'explosion');
            explo.setScale(0.75);
            setTimeout(function() {explo.destroy()}, 500);
            this.y = Math.random();
            econtact = this.sound.add('econtact');
            econtact.play();
            if (this.y > 0.5){
                enemy.y = (Math.random() * (-130 - -30) + -130);
            }

            else if(this.y <= 0.5){
                enemy.y = (Math.random() * (760 - 860) + 760);
            }
            this.x = Math.random();
            console.log(this.x);
            if(this.x >= 0.5){
                enemy.x =(Math.random()* (1350 - 1450) + 1350);
            }

            else if(this.x < 0.5){
                enemy.x =(Math.random() * (-130 - -30) + -130);
            }
            
            this.is_hit = 1;

            if(this.is_hit == 1) {
                enemy.body.setVelocityX(Math.random() * (50-30) + 30);
                enemy.body.setVelocityY(Math.random() * (50-30) + 30);
                this.health = this.health - 1;
                console.log("health: " + this.health);
                //let healthBar=this.makeBar(140,200,0xe74c3c);
                this.setValue(this.healthBar, this.health*20);
                this.is_hit = 0;
            }

            if(this.health == -1000) {
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

    hitaction(enemy){
        enemy.setVelocityY(-1 * enemy.body.velocity.y);
        enemy.setVelocityX(-1 * enemy.body.velocity.x);
        this.score+=5;
        this.scoreText.setText( "Score: " + this.score);
        rcontact = this.sound.add('rcontact');
        rcontact.play();
    }

    racketcollision(enemyhitbox, enemy, hasbeenhit){
        if (Phaser.Geom.Intersects.CircleToRectangle(enemyhitbox, this.racketrect) )
            {

            // enemy.setVelocityY(-1 * enemy.body.velocity.y);
            // enemy.setVelocityX(-1 * enemy.body.velocity.x);
            console.log(hasbeenhit);
            if(hasbeenhit == 1 && this.asteroid1hit == false){
                this.asteroid1hit = true;
                this.hitaction(this.asteroid1);
            }

            if(hasbeenhit == 2 && this.asteroid2hit == false){
                this.asteroid2hit = true;
                this.hitaction(this.asteroid2);
            }

            if(hasbeenhit == 3 && this.asteroid3hit == false){
                this.asteroid3hit = true;
                this.hitaction(this.asteroid3);
            }

            if(hasbeenhit == 4 && this.asteroid4hit == false){
               this.asteroid4hit = true;
               this.hitaction(this.asteroid4);
            }

            if(hasbeenhit == 5 && this.asteroid5hit == false){
                this.asteroid5hit = true;
                this.hitaction(this.asteroid5);
            }

            if(hasbeenhit == 6 && this.spaceship1hit == false){
                this.spaceship1hit = true;
                this.hitaction(this.spaceship1);
            }

            if(hasbeenhit == 7 && this.spaceship2hit == false){
                this.spaceship2hit = true;
                this.hitaction(this.spaceship2);
            }

            if(hasbeenhit == 8 && this.spaceship3hit == false){
                this.spaceship3hit = true;
                this.hitaction(this.spaceship3);
            }

            if(hasbeenhit == 9 && this.spaceship4hit == false){
                this.spaceship4hit = true;
                this.hitaction(this.spaceship4);
            }

            if(hasbeenhit == 10 && this.spaceship5hit == false){
                this.spaceship5hit = true;
                this.hitaction(this.spaceship5);
            }

            if(hasbeenhit == 11 && this. bomb1hit == false){
                this.bomb1hit = true;
                this.hitaction(this.bomb1);
            }

            if(hasbeenhit == 12 && this.bomb2hit == false){
                this.bomb2hit = true;
                this.hitaction(this.bomb2);
            }

            if(hasbeenhit == 13 && this.bomb3hit == false){
                this.bomb3hit = true;
                this.hitaction(this.bomb3);
            }

            if(hasbeenhit == 14 && this.bomb4hit == false){
                this.bomb4hit = true;
                this.hitaction(this.bomb4);
            }

            if(hasbeenhit == 15 && this.bomb5hit == false){
                this.bomb5hit = true;
                this.hitaction(this.bomb5);
            }
            
            //this.asteroid1hit = true;

            // if(!this.isScored) {
                
            //     this.isScored = true;
            // }   
        } 

        if(!(Phaser.Geom.Intersects.CircleToRectangle(enemyhitbox, this.earthsquare))) {
            this.isScored = false;

            if(hasbeenhit == 1 && this.asteroid1hit == true){
                this.asteroid1hit = false;
            }

            if(hasbeenhit == 2 && this.asteroid2hit == true){
                this.asteroid2hit = false;
            }

            if(hasbeenhit == 3 && this.asteroid3hit == true){
                this.asteroid3hit = false;
            }

            if(hasbeenhit == 4 && this.asteroid4hit == true){
                this.asteroid4hit = false;
            }

            if(hasbeenhit == 5 && this.asteroid5hit == true){
                this.asteroid5hit = false;
            }

            if(hasbeenhit == 6 && this.spaceship1hit == true){
                this.spaceship1hit = false;
            }

            if(hasbeenhit == 7 && this.spaceship2hit == true){
                this.spaceship2hit = false;
            }

            if(hasbeenhit == 8 && this.spaceship3hit == true){
                this.spaceship3hit = false;
            }

            if(hasbeenhit == 9 && this.spaceship4hit == true){
                this.spaceship4hit = false;
            }

            if(hasbeenhit == 10 && this.spaceship5hit == true){
                this.spaceship5hit = false;
            }

            if(hasbeenhit == 11 && this. bomb1hit == true){
                this.bomb1hit = false;
            }

            if(hasbeenhit == 12 && this.bomb2hit == true){
                this.bomb2hit = false;
            }

            if(hasbeenhit == 13 && this.bomb3hit == true){
                this.bomb3hit = false;
            }

            if(hasbeenhit == 14 && this.bomb4hit == true){
                this.bomb4hit = false;
            }

            if(hasbeenhit == 15 && this.bomb5hit == true){
                this.bomb5hit = false;
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
            
            
        }

    }

    update(){

        this.graphics.clear();
       // this.graphics.fillRectShape(this.racketrect);
        //this.graphics.fillRectShape(this.earthsquare);

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
                // this.racket.angle = (this.racket.x - 640)/3;
            } else {
                this.rotate(this.angle);
                this.angle = (this.angle - 5/360 - Math.PI / 360) % (Math.PI * 2);
                // this.racket.angle = (this.racket.x - 640)/3;
            }
        }
        if (this.cursors.right.isDown) {
            if(this.keyShift.isDown) {
                this.rotate(this.angle);
                this.angle = (this.angle + 20/360 + Math.PI / 360) % (Math.PI * 2);                
            } else {
                this.rotate(this.angle);
                this.angle = (this.angle + 5/360 + Math.PI / 360) % (Math.PI * 2);
                // if(this.racket.y < 350) {
                //     this.racket.angle = (this.racket.x - 640)/3;
                //     this.racketrect.angle = (this.racket.x - 640)/3;
                // } else {
                //     this.racket.angle = ((this.racket.x - 640)/3)*-1;
                //     this.racketrect.angle = ((this.racket.x - 640)/3)*-1;
                // }
            }
        }

        
        

        this.earthcollision(this.asteroid1circle, this.asteroid1);
        this.earthcollision(this.asteroid2circle, this.asteroid2);
        this.earthcollision(this.asteroid3circle, this.asteroid3);
        this.earthcollision(this.asteroid4circle, this.asteroid4);
        this.earthcollision(this.asteroid5circle, this.asteroid5);

        this.earthcollision(this.spaceship1circle, this.spaceship1);
        this.earthcollision(this.spaceship2circle, this.spaceship2);
        this.earthcollision(this.spaceship3circle, this.spaceship3);
        this.earthcollision(this.spaceship4circle, this.spaceship4);
        this.earthcollision(this.spaceship5circle, this.spaceship5);
        
        this.earthcollision(this.bomb1circle, this.bomb1);
        this.earthcollision(this.bomb2circle, this.bomb2);
        this.earthcollision(this.bomb3circle, this.bomb3);
        this.earthcollision(this.bomb4circle, this.bomb4);
        this.earthcollision(this.bomb5circle, this.bomb5);

        this.racketcollision(this.asteroid1circle, this.asteroid1, 1);
        this.racketcollision(this.asteroid2circle, this.asteroid2, 2);
        this.racketcollision(this.asteroid3circle, this.asteroid3, 3);
        this.racketcollision(this.asteroid4circle, this.asteroid4, 4);
        this.racketcollision(this.asteroid5circle, this.asteroid5, 5);

        
        this.racketcollision(this.spaceship1circle, this.spaceship1, 6);
        this.racketcollision(this.spaceship2circle, this.spaceship2, 7);
        this.racketcollision(this.spaceship3circle, this.spaceship3, 8);
        this.racketcollision(this.spaceship4circle, this.spaceship4, 9);
        this.racketcollision(this.spaceship5circle, this.spaceship5, 10);
        
        this.racketcollision(this.bomb1circle, this.bomb1, 11);
        this.racketcollision(this.bomb2circle, this.bomb2, 12);
        this.racketcollision(this.bomb3circle, this.bomb3, 13);
        this.racketcollision(this.bomb4circle, this.bomb4, 14);
        this.racketcollision(this.bomb5circle, this.bomb5, 15);
        
        if(this.Wave1 == false && this.Wave2 == false && this.Wave3 == false && this.Wave4 == false && this.Wave5 == false){
        this.WaveText = this.add.text(this.earth.x- 40, this.earth.y - 300, "WAVE 1", 
        {color: '#f00', fontSize: '30px', fontFamily: 'monoSpace'});
        this.Wave1 = true;
        }        
        
        

        if (this.Wave1 == true){

            if(this.score >= 5){
            this.WaveText.destroy();
            }
            this.physics.accelerateToObject(this.asteroid1, this.earth, 50, 300, 300);
            if (this.score >= 10){
            this.physics.accelerateToObject(this.asteroid2, this.earth, 50, 300, 300);
            }
            if(this.score >= 15){
                this.physics.accelerateToObject(this.asteroid3, this.earth, 50, 300, 300);
            }
            if(this.score == 50){
                this.Wave2 = true;
                this.resetenemyposition(this.asteroid1);
                this.resetenemyposition(this.asteroid2);
                this.resetenemyposition(this.asteroid3);
                if(this.Wave1 == true){
                    this.WaveText2 = this.add.text(this.earth.x- 40, this.earth.y - 300, "WAVE 2", 
                    {color: '#f00', fontSize: '30px', fontFamily: 'monoSpace'});
                }
            }

        }



        if (this.Wave2 == true){
            this.Wave1 = false;
            this.physics.accelerateToObject(this.asteroid1, this.earth, 50, 300, 300);
            if(this.score >= 55){
            this.WaveText2.destroy();
            }
            if(this.score == 65){
                this.resetenemyposition(this.asteroid2);
            }
            if(this.score >= 70){
                this.physics.accelerateToObject(this.asteroid2, this.earth, 50, 300, 300);
            }
            if(this.score == 80){
                this.resetenemyposition(this.asteroid3);
            }
            if(this.score >= 85){
                this.physics.accelerateToObject(this.asteroid3, this.earth, 50, 300, 300);
            }
            if(this.score == 95){
                this.resetenemyposition(this.spaceship1);
            }
            if(this.score >= 100){
                this.physics.accelerateToObject(this.spaceship1, this.earth, 50, 300, 300);
            }
            if(this.score == 150){
                this.Wave3 = true;
                this.resetenemyposition(this.asteroid1);
                this.resetenemyposition(this.asteroid2);
                this.resetenemyposition(this.asteroid3);
                this.resetenemyposition(this.spaceship1);
                if(this.Wave2 == true){
                    this.WaveText3 = this.add.text(this.earth.x- 40, this.earth.y - 300, "WAVE 3", 
                    {color: '#f00', fontSize: '30px', fontFamily: 'monoSpace'});
            }
            
        }
    }

        if(this.Wave3 == true){
            this.Wave2 = false;
            this.physics.accelerateToObject(this.asteroid1, this.earth, 50, 300, 300);
            if(this.score >= 155){
                this.WaveText3.destroy();
            if(this.score == 165){
                this.resetenemyposition(this.asteroid2);
            }
            if(this.score >= 170){
                this.physics.accelerateToObject(this.asteroid2, this.earth, 50, 300, 300);
            }
            if(this.score == 180){
                this.resetenemyposition(this.asteroid3);
            }
            if(this.score >= 185){
                this.physics.accelerateToObject(this.asteroid3, this.earth, 50, 300, 300);
            }
            if(this.score == 195){
                this.resetenemyposition(this.spaceship1);
            }
            if(this.score >= 200){
                this.physics.accelerateToObject(this.spaceship1, this.earth, 50, 300, 300);
            }
            if(this.score == 210){
                this.resetenemyposition(this.spaceship2);
            }
            if(this.score >= 215){
                this.physics.accelerateToObject(this.spaceship2, this.earth, 50, 300, 300);
            }
            if(this.score == 280){
                this.Wave4 = true;
                this.resetenemyposition(this.asteroid1);
                this.resetenemyposition(this.asteroid2);
                this.resetenemyposition(this.asteroid3);
                this.resetenemyposition(this.spaceship1);
                this.resetenemyposition(this.spaceship2);
                if(this.Wave3 == true){
                    this.WaveText4 = this.add.text(this.earth.x- 40, this.earth.y - 300, "WAVE 4", 
                    {color: '#f00', fontSize: '30px', fontFamily: 'monoSpace'});
            }
            }
        }
    }   

        if(this.Wave4 == true){
            this.Wave3 = false;
            this.physics.accelerateToObject(this.asteroid1, this.earth, 50, 300, 300);
            if(this.score >= 285){
                this.WaveText4.destroy();
            if(this.score == 295){
                this.resetenemyposition(this.asteroid2);
            }
            if(this.score >= 300){
                this.physics.accelerateToObject(this.asteroid2, this.earth, 50, 300, 300);
            }
            if(this.score == 310){
                this.resetenemyposition(this.asteroid3);
            }
            if(this.score >= 315){
                this.physics.accelerateToObject(this.asteroid3, this.earth, 50, 300, 300);
            }
            if(this.score == 325){
                this.resetenemyposition(this.spaceship1);
            }
            if(this.score >= 330){
                this.physics.accelerateToObject(this.spaceship1, this.earth, 50, 300, 300);
            }
            if(this.score == 340){
                this.resetenemyposition(this.spaceship2);
            }
            if(this.score >= 345){
                this.physics.accelerateToObject(this.spaceship2, this.earth, 50, 300, 300);
            }
            if(this.score == 355){
                this.resetenemyposition(this.spaceship3);
            }
            if(this.score >= 360){
                this.physics.accelerateToObject(this.spaceship3, this.earth, 50, 300, 300);
            }
            if(this.score == 450){
                this.Wave5 = true;
                this.resetenemyposition(this.asteroid1);
                this.resetenemyposition(this.asteroid2);
                this.resetenemyposition(this.asteroid3);
                this.resetenemyposition(this.spaceship1);
                this.resetenemyposition(this.spaceship2);
                this.resetenemyposition(this.spaceship3);
                if(this.Wave4 == true){
                    this.WaveText5 = this.add.text(this.earth.x- 40, this.earth.y - 300, "WAVE 5", 
                    {color: '#f00', fontSize: '30px', fontFamily: 'monoSpace'});
            }
        }

    }
}
    if(this.Wave5 == true){
        this.Wave4 = false;
        this.physics.accelerateToObject(this.asteroid1, this.earth, 50, 300, 300);
            if(this.score >= 455){
                this.WaveText5.destroy();
            if(this.score == 465){
                this.resetenemyposition(this.asteroid2);
            }
            if(this.score >= 470){
                this.physics.accelerateToObject(this.asteroid2, this.earth, 50, 300, 300);
            }
            if(this.score == 480){
                this.resetenemyposition(this.asteroid3);
            }
            if(this.score >= 485){
                this.physics.accelerateToObject(this.asteroid3, this.earth, 50, 300, 300);
            }
            if(this.score == 495){
                this.resetenemyposition(this.spaceship1);
            }
            if(this.score >= 500){
                this.physics.accelerateToObject(this.spaceship1, this.earth, 50, 300, 300);
            }
            if(this.score == 510){
                this.resetenemyposition(this.spaceship2);
            }
            if(this.score >= 515){
                this.physics.accelerateToObject(this.spaceship2, this.earth, 50, 300, 300);
            }
            if(this.score == 525){
                this.resetenemyposition(this.spaceship3);
            }
            if(this.score >= 530){
                this.physics.accelerateToObject(this.spaceship3, this.earth, 50, 300, 300);
            }
            if(this.score == 540){
                this.resetenemyposition(this.asteroid4);
            }
            if(this.score == 545){
                this.physics.accelerateToObject(this.asteroid4, this.earth, 50, 300, 300);
            }
            if(this.score == 600){
                this.Wave6 = true;
                this.resetenemyposition(this.asteroid1);
                this.resetenemyposition(this.asteroid2);
                this.resetenemyposition(this.asteroid3);
                this.resetenemyposition(this.spaceship1);
                this.resetenemyposition(this.spaceship2);
                this.resetenemyposition(this.spaceship3);
                this.resetenemyposition(this.asteroid4);
                if(this.Wave5 == true) {
                this.Beta_End = this.add.text(this.earth.x- 40, this.earth.y - 300, "You Completed the Beta!", 
                {color: '#f00', fontSize: '30px', fontFamily: 'monoSpace'});
                }
            }
    }
}

if(this.Wave6 == true){
    this.Wave5 = false;
}

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
        bar.fillRect(0, 0, 400, 100);
        
        //position the bar
        bar.x = x;
        bar.y = y;

        //return the bar
        return bar;
    }

    create() {
        menumusic = this.sound.add('menumusic');
        menumusic.play();
        

        // background
        this.healthBar = this.makeBar(1000 , 0, 'background');
    
    this.clickButton = this.add.text(625, 350, 'RESUME!', { font: '25px Arial', fill: '#0f0' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverState() )
      .on('pointerout', () => this.enterButtonRestState() )
      .on('pointerdown', () => this.enterButtonActiveState() )
      .on('pointerup', () => {
        this.enterButtonHoverState();
        if (this.is_hit == 1) {
            econtact.resume();
        }
        menumusic.stop();
        gamemusic.resume();
        this.scene.stop();
        
        
        //STOP PAUSE MUSIC
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
        this.load.audio('menumusic', 'sound/MainMenu.mp3');
    }

    create() {
        // background
        let bg = this.add.sprite(0, 0, 'background');

        gamemusic.stop();
        menumusic = this.sound.add('menumusic');
        menumusic.play();

        // change origin to the top-left of the sprite
        bg.setOrigin(0, 0);

    this.add.text(450, 50, 'GAME OVER', { font: '50px Arial', align: 'center' });

    this.clickButton = this.add.text(575, 350, 'PLAY AGAIN!', { font: '25px Arial',fill: '#0f0' })
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

