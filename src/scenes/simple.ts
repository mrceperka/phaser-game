import * as Phaser from 'phaser'

export class SimpleScene extends Phaser.Scene {
  private _cats: Phaser.GameObjects.Image[] = []
  private _playOrPause: Phaser.GameObjects.Text
  private _running: boolean = true
  preload = () => {
    this.load.image('cat', 'assets/cat.png')
  }
  _createPlayOrPause = () => {
    this._playOrPause = this.add.text(150, 25, 'Play or pause', {
      fill: 'white',
      fontStyle: 'bold',
    })
    this._playOrPause.setInteractive()
    this._playOrPause.on('pointerdown', () => {
      this._running = !this._running
    })
  }
  _createCats = () => {
    this._cats = [200, 400, 600, 800].map(x => {
      const cat = this.add.image(
        0,
        Number(this.sys.game.config.height) / 2,
        'cat'
      )
      cat.setScale(0.3, 0.3)

      cat.x = x + cat.getBounds().width / 2

      return cat
    })
  }
  create = () => {
    this._createCats()

    this.add.text(25, 25, 'Meow there!', {
      fill: 'gold',
      fontStyle: 'bold',
    })

    this._createPlayOrPause()
  }
  _updatePlayOrPause = () => {
    this._playOrPause.setText(this._running ? 'Pause!' : 'Play!')
  }
  _updateCats = () => {
    const pointer = this.sys.game.input.activePointer
    this._cats.forEach(cat => {
      // movement
      if (this._running) {
        const bounds = cat.getBounds()
        if (bounds.left > this.sys.game.config.width) {
          cat.x = 0 - bounds.width / 2
        }
        cat.x += 3
      }

      // pointer down
      if (pointer.isDown) {
        this._cats.forEach(cat => {
          const isPointerOver = cat.getBounds().contains(pointer.x, pointer.y)
          if (isPointerOver) {
            cat.angle += 1
          }
        })
      }
    })
  }
  update = () => {
    this._updatePlayOrPause()
    this._updateCats()
  }
}
