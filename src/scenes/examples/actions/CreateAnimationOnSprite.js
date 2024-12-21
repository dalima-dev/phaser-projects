import { Scene } from "phaser";
import { goBack } from "../../../utils/goBack";

export class CreateAnimationOnSprite extends Scene {
  constructor() {
    super("CreateAnimationOnSprite");
  }

  preload() {
    this.load.atlas(
      "soldier",
      "assets/animations/soldier.png",
      "assets/animations/soldier.json"
    );
    this.load.image("bg", "assets/town-wreck.jpg");
  }

  create() {
    this.add.image(400, 300, "bg");
    goBack(this);

    const rambo = this.add.sprite(500, 500, "soldier");

    //  The following animation is created directly on the 'rambo' Sprite.

    //  It cannot be used by any other sprite, and the key ('walk') is never added to
    //  the global Animation Manager, as it's kept local to this Sprite.
    rambo.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames("soldier", {
        prefix: "soldier_3_walk_",
        start: 1,
        end: 8,
      }),
      frameRate: 12,
      repeat: -1,
    });

    //  Now let's create a new 'walk' animation that is stored in the global Animation Manager:
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames("soldier", {
        prefix: "Soldier_2_walk_",
        start: 1,
        end: 8,
      }),
      frameRate: 12,
      repeat: -1,
    });

    //  Because the rambo Sprite has its own 'walk' animation, it will play it:
    rambo.play("walk");

    //  However, this Sprite will play the global 'walk' animation, because it doesn't have its own:
    this.add.sprite(200, 500, "soldier").play("walk");
  }
}
