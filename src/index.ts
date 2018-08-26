import * as Phaser from 'phaser'

import CatScene from './scenes/cat'
import SkeletonScene from './scenes/skeleton'

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#ffffff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
    },
  },
  scene: [/*CatScene*/ SkeletonScene],
})
