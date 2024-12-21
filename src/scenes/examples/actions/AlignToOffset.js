import { Scene } from "phaser";
import { getRandomHex } from "../../../utils/getRandomHex";
import { goBack } from "../../../utils/goBack";

const SQUARES_NUMBER = 8;

export class AlignToOffset extends Scene {
  constructor() {
    super("AlignToOffset");

    this.x = 0;
    this.rectangles = [];
  }

  create() {
    goBack(this);

    this.rectangles.push(this.add.rectangle(150, 493, 50, 50, 0x9d2d9d));

    for (let i = 0; i < SQUARES_NUMBER; i++) {
      this.rectangles.push(this.add.rectangle(0, 0, 50, 50, getRandomHex()));
    }
  }

  update() {
    Phaser.Actions.AlignTo(
      this.rectangles,
      Phaser.Display.Align.RIGHT_CENTER,
      Math.cos(this.x) * SQUARES_NUMBER,
    );

    this.x += 0.1;
  }
}
