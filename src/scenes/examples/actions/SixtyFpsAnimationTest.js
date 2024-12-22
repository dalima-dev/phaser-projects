import { Scene } from "phaser";
import { goBack } from "../../../utils/goBack";

export class SixtyFpsAnimationTest extends Scene {
  constructor() {
    super("SixtyFpsAnimationTest");
  }

  preload() {
    this.load.atlas(
      "walker",
      "assets/animations/walker.png",
      "assets/animations/walker.json"
    );
    this.load.image("sky", "assets/skies/ms3-sky.png");
    this.load.image("trees", "assets/skies/ms3-trees.png");
  }

  create() {
    this.bg = this.add.tileSprite(0, 38, 800, 296, "sky").setOrigin(0, 0);
    this.trees = this.add.tileSprite(0, 280, 800, 320, "trees").setOrigin(0, 0);
    goBack(this);

    const animConfig = {
      key: "walk",
      frames: "walker",
      frameRate: 60,
      repeat: -1,
    };

    this.anims.create(animConfig);

    const sprite = this.add.sprite(400, 484, "walker", "frame_0000");

    sprite.play("walk");
  }

  update() {
    this.bg.tilePositionX -= 0.1;
    this.trees.tilePositionX -= 6;
  }
}
