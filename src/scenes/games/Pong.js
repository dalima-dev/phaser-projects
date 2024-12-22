import { Scene } from "phaser";

const INITIAL_VELOCITY = 300;
const INITIAL_LINE_POS = 30;
const LINE_GAP = 5;
const LINE_HEIGHT = 20;
const OBJECTS_COLOR = 0xffffff;

const PLAYER_WIDTH = 5;
const PLAYER_HEIGHT = 50;
const PLAYER_BOUND_DISTANCE = 30;

export class Pong extends Scene {
  constructor() {
    super("Pong");
  }

  init() {
    this.centerX = this.game.config.width / 2;
    this.centerY = this.game.config.height / 2;

    this.cameras.main.setBackgroundColor("#000000");

    const graphics = this.add.graphics();
    graphics.lineStyle(2, OBJECTS_COLOR);

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
    this.ball = this.add.rectangle(
      this.centerX,
      this.centerY,
      5,
      5,
      OBJECTS_COLOR
    );
    this.physics.add.existing(this.ball);

    this.firstPlayer = this.add.rectangle(
      PLAYER_BOUND_DISTANCE,
      this.centerY,
      PLAYER_WIDTH,
      PLAYER_HEIGHT,
      OBJECTS_COLOR
    );

    this.secondPlayer = this.add.rectangle(
      this.game.config.width - PLAYER_BOUND_DISTANCE,
      this.centerY,
      PLAYER_WIDTH,
      PLAYER_HEIGHT,
      OBJECTS_COLOR
    );

    this.physics.add.existing(this.firstPlayer);
    this.physics.add.existing(this.secondPlayer);

    this.physics.add.collider(this.ball, this.firstPlayer);
    this.physics.add.collider(this.ball, this.secondPlayer);

    this.firstPlayer.body.pushable = false;
    this.secondPlayer.body.pushable = false;

    this.ball.body
      .setVelocity(INITIAL_VELOCITY, INITIAL_VELOCITY)
      .setBounce(1, 1)
      .setCollideWorldBounds();
  }

  update() {}
}
