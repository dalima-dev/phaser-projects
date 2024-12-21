import { Scene } from "phaser";
import { goBack } from "../../../utils/goBack";

export class Angle extends Scene {
  constructor() {
    super("Angle");

    this.gingerbreads = [];
  }

  preload() {
    this.load.image("gingerbread", "assets/sprites/gingerbread.png");
  }

  create() {
    goBack(this);

    for (let i = 0; i < 32; i++) {
      const x = Phaser.Math.Between(0, 800);
      const y = Phaser.Math.Between(0, 600);

      this.gingerbreads.push(this.add.image(x, y, "gingerbread"));
    }
  }

  update() {
    Phaser.Actions.Angle(this.gingerbreads, 1);
  }
}
