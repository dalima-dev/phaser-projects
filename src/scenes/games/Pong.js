import { Scene } from "phaser";

const INITIAL_VELOCITY = 300;

export class Pong extends Scene {
  constructor() {
    super("Pong");
  }

  init() {
    // this.cameras.main.setBackgroundColor("#000000");
  }

  create() {
    const centerX = this.game.config.width / 2;
    const centerY = this.game.config.height / 2;

    const ball = this.add.rectangle(centerX, centerY, 5, 5, 0xffffff);
    this.physics.add.existing(ball);

    ball.body
      .setVelocity(INITIAL_VELOCITY, INITIAL_VELOCITY)
      .setBounce(1, 1)
      .setCollideWorldBounds(true);
  }

  update() {}
}
