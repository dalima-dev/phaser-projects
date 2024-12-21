export function goBack(scene, x = 720, y = 10) {
  const goBack = scene.add.text(x, y, "go back", {
    fontSize: "16px",
    color: "#00ff00",
  });

  goBack.setInteractive();
  goBack.once("pointerdown", () => {
    scene.scene.start("MainMenu");
  });

  goBack.on("pointerover", () => {
    goBack.setStyle({ color: "#ffff00" });
    scene.game.canvas.style.cursor = "pointer";
  });
  goBack.on("pointerout", () => {
    goBack.setStyle({ color: "#00ff00" });
    scene.game.canvas.style.cursor = "default";
  });
}
