import { Boot } from "./scenes/Boot";
import { AlignTo } from "./scenes/examples/actions/AlignTo";
import { AlignToBase } from "./scenes/examples/actions/AlignToBase";
import { AlignToOffset } from "./scenes/examples/actions/AlignToOffset";
import { Angle } from "./scenes/examples/actions/Angle";
import { AngleWithStep } from "./scenes/examples/actions/AngleWithStep";
import { CreateAnimationOnSprite } from "./scenes/examples/actions/CreateAnimationOnSprite";
import { SixtyFpsAnimationTest } from "./scenes/examples/actions/SixtyFpsAnimationTest";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

// Example scenes
const ActionExampleScenes = [
  AlignTo,
  AlignToBase,
  AlignToOffset,
  Angle,
  AngleWithStep,
];

const AnimationExampleScenes = [CreateAnimationOnSprite, SixtyFpsAnimationTest];

const ExampleScenes = [...ActionExampleScenes, ...AnimationExampleScenes];

// Game scenes
const GameScenes = [];

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  backgroundColor: "#028af8",
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Preloader, MainMenu, ...ExampleScenes, ...GameScenes],
};

export default new Phaser.Game(config);
