import * as Phaser from 'phaser'

import { SimpleScene } from './scenes/simple'

const game = new Phaser.Game({
  width: window.innerWidth,
  height: window.innerHeight,
  scene: SimpleScene,
})
