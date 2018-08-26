import * as Phaser from 'phaser'

type Keys = {
  [K in
    | 'left'
    | 'right'
    | 'up'
    | 'down'
    | 'w'
    | 's'
    | 'a'
    | 'd'
    | 'space']: Phaser.Input.Keyboard.Key
}
/**
 * A class that wraps up our 2D platforming player logic. It creates, animates and moves a sprite in
 * response to WASD/arrow keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
export default class Skeleton {
  private _scene: Phaser.Scene
  public sprite: Phaser.Physics.Arcade.Sprite
  private _keys: Keys
  constructor(scene: Phaser.Scene, x: number, y: number) {
    this._scene = scene

    this.createAnims()

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add.sprite(x, y, 'skeleton', 0).setDrag(1000, 0)
    this.sprite.body.allowGravity = false

    // Track the arrow keys & WASD
    const {
      LEFT,
      RIGHT,
      UP,
      DOWN,
      W,
      S,
      A,
      D,
      SPACE,
    } = Phaser.Input.Keyboard.KeyCodes
    this._keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      w: W,
      s: S,
      a: A,
      d: D,
      space: SPACE,
    }) as Keys
  }

  update() {
    const keys = this._keys
    const sprite = this.sprite
    const velocity = 100
    let isIdle = true

    if (keys.left.isDown || keys.a.isDown) {
      sprite.setVelocityX(-velocity)
      sprite.setFlipX(true)
    } else if (keys.right.isDown || keys.d.isDown) {
      sprite.setVelocityX(velocity)
      sprite.setFlipX(false)
    } else {
      sprite.setVelocityX(0)
    }

    if (keys.up.isDown || keys.w.isDown) {
      sprite.setVelocityY(-velocity)
    } else if (keys.down.isDown || keys.s.isDown) {
      sprite.setVelocityY(velocity)
    } else {
      sprite.setVelocityY(0)
    }

    if (sprite.body.velocity.x !== 0) {
      isIdle = false
      sprite.anims.play('skeleton_walk_anim', true)
    }

    if (keys.space.isDown) {
      isIdle = false
      sprite.anims.play('skeleton_attack_anim', true)
    }
    if (isIdle) {
      sprite.anims.play('skeleton_idle_anim', true)
    }
  }

  destroy() {
    this.sprite.destroy()
  }

  static preload = (scene: Phaser.Scene) => {
    scene.load.spritesheet(
      'skeleton_walk',
      'assets/sprites/skeleton/skeleton_walk.png',
      {
        frameWidth: 22,
        frameHeight: 33,
      }
    )
    scene.load.spritesheet(
      'skeleton_idle',
      'assets/sprites/skeleton/skeleton_idle.png',
      {
        frameWidth: 24,
        frameHeight: 32,
      }
    )
    scene.load.spritesheet(
      'skeleton_attack',
      'assets/sprites/skeleton/skeleton_attack.png',
      {
        frameWidth: 43,
        frameHeight: 37,
      }
    )
  }
  createAnims = () => {
    const anims = this._scene.anims
    anims.create({
      key: 'skeleton_walk_anim',
      frames: anims.generateFrameNumbers('skeleton_walk', {}),
      frameRate: 20,
      repeat: -1,
    })

    anims.create({
      key: 'skeleton_idle_anim',
      frames: anims.generateFrameNumbers('skeleton_idle', {}),
      frameRate: 5,
      repeat: -1,
    })

    anims.create({
      key: 'skeleton_attack_anim',
      frames: anims.generateFrameNumbers('skeleton_attack', {}),
      frameRate: 20,
      repeat: -1,
    })
  }
}
