import * as Phaser from 'phaser'

export class SimpleScene extends Phaser.Scene {
  preload() {
    this.load.image('cat', 'assets/cat.png')
  }
  create() {
    this.add.image(250, 200, 'cat')
    const text = this.add.text(25, 25, 'Hello from phaser!', {
      fill: 'black',
      fontStyle: 'bold',
    })
    text.depth = 1
  }
}
