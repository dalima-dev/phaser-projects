import { Scene } from "phaser";
import { goBack } from "../../../utils/goBack";

export class AngleWithStep extends Scene {
  constructor() {
    super("AngleWithStep");

    this.gingerbreads = [];
  }

  preload() {
    this.load.image("gingerbread", "assets/sprites/gingerbread.png");
  }

  create() {
    goBack(this);

    for (let i = 0; i < 26; i++) {
      this.gingerbreads.push(this.add.image(i * 32, 300, "gingerbread"));
    }
  }

  update() {
    Phaser.Actions.Angle(this.gingerbreads, 0.01, 0.15);
  }
}
