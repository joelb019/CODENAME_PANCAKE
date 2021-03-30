# CODENAME_PANCAKE
Repo for our awesome and totally fun game.

In this game, you bounce objects and enemies with a tennis racket away from Earth to prevent apocalyptic destruction.

The Earth is in imminent danger. Countless asteroids, bombs, and evil alien invaders are trying to destroy the planet and end all life as we know it. It is your job as Earth’s final line of defense with a giant Tennis racket to bounce away all of the objects and invaders to keep Earth’s health from dropping to zero. 
In the first 2 minutes, you are presented with the Earth at the bottom of the screen and its health bar. It tells you that you can move the tennis racket that is above the earth with the left and right arrow keys or the a and d keys. The first enemy type will come toward the earth and you move the racket under the enemies to bounce them away. After about 1 minute of bouncing things away from Earth, you are presented with an upgrade screen and can purchase an upgrade or powerup. The game progressively becomes harder with faster enemies that can move in complex patterns. The game ends when the health of the Earth reaches zero.

The game is a simple flash type game with very simple controls. It is in a cartoonish style and takes place in space. It is a roguelike survival game where you just go as long as you can to get the highest score possible.

https://docs.google.com/document/d/13Ek3VYffR4sTGDvkG3Bqmtkfbvw7VdyvxwZMCgAPB0Y/edit#

https://app.diagrams.net/#G1xYrPvf_53k-xbayoOAUgnm4na1JXY6MI

**
Trey Barone
Joel Bevenour
Michael Gublo
William Castner
Rueben Aguilar 
Jimmy Littley
Luke Borkowski
**

titleScene - Triggered when html file is first loaded

gameScene - Triggered when the "Start" button is clicked or when the restart button is clicked on the endMenu scene

endMenu - Triggered when the Earth runs out of health and you get a Game Over

pauseMenu - Triggered when the Pause button is clicked on the gameScene

ControlsMenu - Triggered when the Controls button is clicked on the titleScene

AboutScreen - Triggered when the About button is clicked on the titleScene


asteroid.png - image used for asteroid enemy

background.jpg - image used for the background of the game

earth.png - Earth sprite used in the game

earthExplosion - sprite used when Earth runs out of health and you get a game over

explosion - sprite used when enemy hits earth to indicate damage was taken

nuke.png - image used for nuke enemy (not used yet but planned for later implementation)

ufo.png - image sued for ufo enemy

tennis.png - image used for tennis racket you control

ping-pong paddle Large.png - image used for the ping pong paddle you control (not used yet but planned for later implementation)

CometEarthContact.mp3 - sound used when enemy collides with Earth

CometRacketContact.mp3 - sound used when enemy collides with the racket

HalfHealth.mp3 - sound used to tell player they are on half health

InGame.mp3 - Music used during normal gameplay

MainMenu.mp3 - Music used on game over screen

EOL = wave number * score - health
