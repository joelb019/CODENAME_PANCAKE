//This is the beginning of our terrible, awful, no good, very bad game.

class SimpleScene extends Phaser.Scene {

    constructor() {
        super({key: 'SimpleScene'});
    }

    create() {
      let clickCount = 0;
      this.clickCountText = this.add.text(100, 200, '');
  
      this.clickButton = this.add.text(100, 100, 'Click me!', { fill: '#0f0' })
        .setInteractive()
        .on('pointerover', () => this.enterButtonHoverState() )
        .on('pointerout', () => this.enterButtonRestState() )
        .on('pointerdown', () => this.enterButtonActiveState() )
        .on('pointerup', () => {
          this.updateClickCountText(++clickCount);
          this.enterButtonHoverState();
          this.scene.start('titleScene');
          console.log('Change Scene to Title');
      });
  
      this.updateClickCountText(clickCount);
    }
  
    updateClickCountText(clickCount) {
      this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
    }
  
    enterButtonHoverState() {
      this.clickButton.setStyle({ fill: '#ff0'});
    }
  
    enterButtonRestState() {
      this.clickButton.setStyle({ fill: '#0f0' });
    }
  
    enterButtonActiveState() {
      this.clickButton.setStyle({ fill: '#0ff' });
    }
}

class titleScene extends Phaser.Scene {

    constructor() {
        super({key: 'titleScene'});
    }

    preload() {
        this.load.image('background_button', 'img/StartButton.jpg');
    }

    create() {
        this.clickButton = this.add.sprite(0, 0, 'background_button')
        .setOrigin(0, 0)
        .setInteractive()
        .on('pointerup', () => {
          this.scene.start('mainScene');
          console.log('Chance Scene to Main');
        });
    }
}

class mainScene extends Phaser.Scene {

    constructor() {
        super({key: 'mainScene'});
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

        this.add.text(100, 100, 'testing text');
    }
}

let config = {
    type: Phaser.AUTO, //Phaser will decide how to render our game (WebGL or Canvas)
    width: 640, // game width
    height: 360, // game height
    scene: [SimpleScene, titleScene], // our newly created scene
    parent: 'main-game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false
        }
    }
};

let game = new Phaser.Game(config);