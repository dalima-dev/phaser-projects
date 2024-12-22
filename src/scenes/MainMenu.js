import { Scene } from "phaser";

const actionExampleOptions = [
  "AlignTo",
  "AlignToBase",
  "AlignToOffset",
  "Angle",
  "AngleWithStep",
];

const animationExampleOptions = [
  "CreateAnimationOnSprite",
  "SixtyFpsAnimationTest",
];

const menuOptions = [actionExampleOptions, animationExampleOptions];

const gameOptions = [["Pong"]];

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.scene.start("Pong");

    this.add.text(0, 0, "Examples", {
      fontSize: "32px",
    });

    const actionText = this.add.text(20, 40, "Actions:", {
      fontSize: "16px",
    });

    const animationText = this.add.text(20, 60, "Animations:", {
      fontSize: "16px",
    });

    const gamesText = this.add.text(20, 80, "Games:", {
      fontSize: "16px",
    });

    const options = [actionText, animationText, gamesText];

    [...menuOptions, ...gameOptions].forEach((menuItemOptions, index) => {
      const itemOptions = [options[index]];

      menuItemOptions.forEach((option, index) => {
        const text = this.add.text(0, 0, option, {
          fontSize: "16px",
          color: "#00ff00",
        });

        text.setInteractive();
        text.on("pointerdown", () => {
          this.scene.start(menuItemOptions[index]);
        });

        text.on("pointerover", () => {
          text.setStyle({ color: "#ffff00" });
          this.game.canvas.style.cursor = "pointer";
        });

        text.on("pointerout", () => {
          text.setStyle({ color: "#00ff00" });
          this.game.canvas.style.cursor = "default";
        });

        itemOptions.push(text);
      });

      Phaser.Actions.AlignTo(itemOptions, Phaser.Display.Align.RIGHT_BOTTOM, 8);
    });
  }
}
