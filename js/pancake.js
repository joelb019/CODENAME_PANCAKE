//This is the beginning of our terrible, awful, no good, very bad game.

class mainMenu extends Phaser.Scene {
    constructor() {
        super({key: 'mainMenu'});
    }

    preload() {
      this.load.image('background', 'img/bgPlaceholder.jpg');
      this.load.image('planet', 'img/earthPlaceholder.png');
    }

    create() {
      let background = this.add.sprite(35, 0, 'background');
      background.setOrigin(0, 0);

      this.add.text(45, 50, 'CODENAME: PANCAKE', { font: '50px Arial', align: 'center' });
      this.add.text(55, 300, 'Use the left and right arrow keys to move the paddle and protect the planet!', { font: '16px Arial', align: 'center' })

      this.clickButton = this.add.text(260, 200, 'START GAME!', { fill: '#0f0' })
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
    constructor() {
        super({key: 'gameScene'});
    }

    preload() {
        this.load.image('background', 'img/bgPlaceholder.jpg');
        this.load.image('planet', 'img/earthPlaceholder.png');
    }

    create() {
        let background = this.add.sprite(0, 0, 'background');
        background.setOrigin(0, 0);

        let planet = this.add.sprite(0, 0, 'planet');
        planet.setOrigin(0, 330);

        this.add.text(100, 100, 'game');
    }
}

let config = {
    type: Phaser.AUTO, //Phaser will decide how to render our game (WebGL or Canvas)
    width: 640, // game width
    height: 360, // game height
    scene: [mainMenu, gameScene], 
    parent: 'main-game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false
        }
    }
};

let game = new Phaser.Game(config);