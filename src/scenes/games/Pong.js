import { Scene } from "phaser";

const INITIAL_VELOCITY = 300;
const INITIAL_LINE_POS = 30;
const LINE_GAP = 5;
const LINE_HEIGHT = 20;

export class Pong extends Scene {
  centerX;
  centerY;

  constructor() {
    super("Pong");
  }

  init() {
    this.centerX = this.game.config.width / 2;
    this.centerY = this.game.config.height / 2;

    this.cameras.main.setBackgroundColor("#000000");

    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffffff);

    graphics.beginPath();
    for (let i = 0; i < 20; i++) {
      const positionY = i * INITIAL_LINE_POS + LINE_GAP;

      graphics.moveTo(this.centerX, positionY);
      graphics.lineTo(this.centerX, positionY + LINE_HEIGHT);
    }
    graphics.closePath();
    graphics.strokePath();
  }

  create() {
    const ball = this.add.rectangle(this.centerX, this.centerY, 5, 5, 0xffffff);
    this.physics.add.existing(ball);

    ball.body
      .setVelocity(INITIAL_VELOCITY, INITIAL_VELOCITY)
      .setBounce(1, 1)
      .setCollideWorldBounds(true);
  }

  update() {}
}
