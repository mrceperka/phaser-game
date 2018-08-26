import * as Phaser from 'phaser'
import Skeleton from '../skeleton/skeleton'

/**
 * A class that extends Phaser.Scene and wraps up the core logic for the platformer level.
 */
export default class SkeletonScene extends Phaser.Scene {
  private _skeleton: Skeleton
  constructor() {
    super({ key: 'SkeletonScene', active: true })
  }
  preload() {
    Skeleton.preload(this)
  }

  create() {
    this._skeleton = new Skeleton(this, 50, 50)
    // this.cameras.main.startFollow(this._skeleton.sprite)
  }

  update() {
    this._skeleton.update()
  }
}
