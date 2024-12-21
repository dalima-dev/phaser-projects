import { Scene } from "phaser";

export class AlignTo extends Scene {
  constructor() {
    super("AlignTo");
  }

  create() {
    const gems = [];

    //  This is our 'lead' Sprite, the first one in the array
    gems.push(this.add.rectangle(150, 493, 50, 50, 0x9d2d9d).setOrigin(0, 0));

    for (let i = 0; i < 8; i++) {
      //  All of the gems will be aligned to the right of the lead gem
      gems.push(
        this.add.rectangle(
          0,
          0,
          50,
          50,
          Number(`0xff${Math.floor(Math.random() * 100000000)}`)
        )
      );
    }

    Phaser.Actions.AlignTo(gems, Phaser.Display.Align.RIGHT_CENTER);
  }
}
