import { Scene } from "phaser";

const actionExampleOptions = ["AlignTo", "AlignToBase"];

const menuOptions = [...actionExampleOptions];

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.add.text(0, 0, "Examples", {
      fontSize: "32px",
    });

    this.add.text(20, 40, "Actions:", {
      fontSize: "16px",
    });

    menuOptions.forEach((option, index) => {
      const text = this.add.text(100 + index * 70, 40, option, {
        fontSize: "16px",
        color: "#00ff00",
      });

      text.setInteractive();
      text.on("pointerdown", () => {
        this.scene.start(menuOptions[index]);
      });

      text.on("pointerover", () => {
        text.setStyle({ color: "#ffff00" });
        this.game.canvas.style.cursor = "pointer";
      });
      text.on("pointerout", () => {
        text.setStyle({ color: "#00ff00" });
        this.game.canvas.style.cursor = "default";
      });
    });
  }
}
