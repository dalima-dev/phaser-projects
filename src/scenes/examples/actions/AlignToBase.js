import { Scene } from "phaser";
import { getRandomHex } from "../../../utils/getRandomHex";
import { goBack } from "../../../utils/goBack";

export class AlignToBase extends Scene {
  constructor() {
    super("AlignToBase");
  }

  create() {
    goBack(this);

    this.add.rectangle(0, 500, 800, 100, 0x9d2d9d).setOrigin(0, 0);

    const rectangles = [];

    for (let i = 0; i < 8; i++) {
      rectangles.push(this.add.rectangle(100, 500, 50, 50, getRandomHex()));
    }

    Phaser.Actions.AlignTo(rectangles, Phaser.Display.Align.RIGHT_BOTTOM, 10);
  }
}
