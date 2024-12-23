import { Scene } from "phaser";

const INITIAL_VELOCITY = 200;
const INITIAL_LINE_POS = 30;
const LINE_GAP = 5;
const LINE_HEIGHT = 20;
const OBJECTS_COLOR = 0xffffff;

const PLAYER_WIDTH = 5;
const PLAYER_HEIGHT = 50;
const PLAYER_BOUND_DISTANCE = 30;

const FIRST_PLAYER_VELOCITY = 300;

const SECOND_PLAYER_ACCELERATION = 3000;
const SECOND_PLAYER_FRICTION = SECOND_PLAYER_ACCELERATION - 1000;

export class Pong extends Scene {
  constructor() {
    super("Pong");
  }

  init() {
    this.centerX = this.game.config.width / 2;
    this.centerY = this.game.config.height / 2;

    this.firstPlayerScore = this.data.get("firstPlayerScore") || 0;
    this.secondPlayerScore = this.data.get("secondPlayerScore") || 0;

    this.cameras.main.setBackgroundColor("#000000");

    this.firstPlayerScoreText = this.add.text(
      this.centerX - 4 * 40,
      0,
      this.firstPlayerScore,
      {
        fontSize: "80px",
      }
    );

    this.secondPlayerScoreText = this.add.text(
      this.centerX - 10 + 3 * 40,
      0,
      this.secondPlayerScore,
      {
        fontSize: "80px",
      }
    );

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

  preload() {
    this.load.audio("pong", "assets/sounds/pong.mp3");
    this.load.audio("pong-score", "assets/sounds/pong-score.mp3");
  }

  create() {
    this.ball = this.add.rectangle(
      this.centerX,
      Phaser.Math.Between(0, this.game.config.height),
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

    this.physics.add.collider(this.ball, this.firstPlayer, () =>
      this.sound.play("pong")
    );
    this.physics.add.collider(this.ball, this.secondPlayer, () =>
      this.sound.play("pong")
    );

    this.firstPlayer.body.pushable = false;
    this.secondPlayer.body.pushable = false;

    const rnd = Phaser.Math.RND;
    const ballDirectionSignalOnStart = rnd.pick([1, -1]);

    this.ball.body
      .setVelocity(
        ballDirectionSignalOnStart * INITIAL_VELOCITY,
        INITIAL_VELOCITY
      )
      .setMaxVelocity(INITIAL_VELOCITY, INITIAL_VELOCITY)
      .setBounce(1, 1)
      .setCollideWorldBounds();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.firstPlayer.body.setMaxVelocityX(0).setCollideWorldBounds();
    this.secondPlayer.body.setMaxVelocityX(0).setCollideWorldBounds();
  }

  update() {
    if (this.cursors.up.isDown) {
      this.firstPlayer.body.setVelocityY(-FIRST_PLAYER_VELOCITY);
    } else if (this.cursors.down.isDown) {
      this.firstPlayer.body.setVelocityY(FIRST_PLAYER_VELOCITY);
    } else if (this.cursors.up.isUp || this.cursors.down.isUp) {
      this.firstPlayer.body.setVelocityY(0);
    }

    if (this.secondPlayer.body.velocity.y > 0) {
      this.secondPlayer.body.setAccelerationY(-SECOND_PLAYER_FRICTION);
    } else {
      this.secondPlayer.body.setAccelerationY(SECOND_PLAYER_FRICTION);
    }

    if (Math.abs(this.secondPlayer.body.velocity.y) <= 10) {
      this.secondPlayer.body.setAccelerationY(0);
      this.secondPlayer.body.setVelocityY(0);
    }

    if (this.ball.body.velocity.x > 0) {
      this.physics.accelerateTo(
        this.secondPlayer,
        this.secondPlayer.x,
        this.ball.y,
        SECOND_PLAYER_ACCELERATION,
        0,
        FIRST_PLAYER_VELOCITY
      );
    }

    if (this.ball.body.position.x >= this.game.config.width - PLAYER_WIDTH) {
      this.sound.play("pong-score");
      this.data.inc("firstPlayerScore", 1);
      this.firstPlayerScoreText.setText(this.firstPlayerScore + 1);
      this.reinitialize();
    }

    if (this.ball.body.position.x <= 0) {
      this.sound.play("pong-score");
      this.data.inc("secondPlayerScore", 1);
      this.secondPlayerScoreText.setText(this.secondPlayerScore + 1);
      this.reinitialize();
    }

    if (this.firstPlayerScore === 10 || this.secondPlayerScore === 10) {
      this.data.set("firstPlayerScore", null);
      this.data.set("secondPlayerScore", null);
      this.scene.restart();
    }
  }

  reinitialize() {
    this.scene.pause();
    setTimeout(() => {
      this.scene.restart();
    }, 3000);
  }
}
