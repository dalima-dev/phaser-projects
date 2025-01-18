import { Scene } from "phaser";

const PADDLE_VELOCITY = 500;

export class Breakout extends Scene {
  constructor() {
    super("Breakout");

    this.bricks;
    this.paddle;
    this.ball;
  }

  init() {
    this.cameras.main.setBackgroundColor("#000000");
  }

  preload() {
    this.load.atlas(
      "assets",
      "assets/games/breakout/breakout.png",
      "assets/games/breakout/breakout.json"
    );
  }

  create() {
    //  Enable world bounds, but disable the floor
    this.physics.world.setBoundsCollision(true, true, true, false);

    //  Create the bricks in a 10x6 grid
    this.bricks = this.physics.add.staticGroup({
      key: "assets",
      frame: ["blue1", "red1", "green1", "yellow1", "silver1", "purple1"],
      frameQuantity: 10,
      gridAlign: {
        width: 10,
        height: 6,
        cellWidth: 64,
        cellHeight: 32,
        x: 112,
        y: 100,
      },
    });

    this.ball = this.physics.add
      .image(400, 500, "assets", "ball1")
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.ball.setData("onPaddle", true);

    this.paddle = this.physics.add
      .image(400, 550, "assets", "paddle1")
      .setCollideWorldBounds()
      .setImmovable();

    //  Our colliders
    this.physics.add.collider(
      this.ball,
      this.bricks,
      this.hitBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.paddle,
      this.hitPaddle,
      null,
      this
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    this.moveBall();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.paddle.body.setVelocityX(-PADDLE_VELOCITY);
    } else if (this.cursors.right.isDown) {
      this.paddle.body.setVelocityX(PADDLE_VELOCITY);
    } else if (this.cursors.up.isUp || this.cursors.down.isUp) {
      this.paddle.body.setVelocityX(0);
    }

    if (this.ball.y > 600) {
      this.resetLevel();
    }
  }

  hitBrick(ball, brick) {
    brick.disableBody(true, true);

    if (this.bricks.countActive() === 0) {
      this.resetLevel();
    }
  }

  moveBall() {
    if (this.ball.getData("onPaddle")) {
      this.ball.setVelocity(-75, -300);
      this.ball.setData("onPaddle", false);
    }
  }

  resetBall() {
    this.paddle.setPosition(this.game.config.width / 2, 550);
    this.ball.setVelocity(0);
    this.ball.setPosition(this.paddle.x, 500);
    this.ball.setData("onPaddle", true);
    this.moveBall();
  }

  resetLevel() {
    this.resetBall();

    this.bricks.children.each((brick) => {
      brick.enableBody(false, 0, 0, true, true);
    });
  }

  hitPaddle(ball, paddle) {
    let diff = 0;

    if (ball.x < paddle.x) {
      //  Ball is on the left-hand side of the paddle
      diff = paddle.x - ball.x;
      ball.setVelocityX(-10 * diff);
    } else if (ball.x > paddle.x) {
      //  Ball is on the right-hand side of the paddle
      diff = ball.x - paddle.x;
      ball.setVelocityX(10 * diff);
    } else {
      //  Ball is perfectly in the middle
      //  Add a little random X to stop it bouncing straight up!
      ball.setVelocityX(2 + Math.random() * 8);
    }
  }
}
