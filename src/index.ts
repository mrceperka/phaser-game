import * as Phaser from 'phaser'

import { SimpleScene } from './scenes/simple'

const gameConfig = {
  width: 800,
  height: 400,
  scene: SimpleScene,
}

new Phaser.Game(gameConfig)
