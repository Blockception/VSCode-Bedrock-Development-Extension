import { expect } from "chai";
import * as edu from "./edu.json";
import * as vanilla from "./vanilla.json";

describe("minecraft data", () => {
  describe("edu vs vanilla", () => {
    it("blocks", () => {
      TestContent(edu.blocks, vanilla.blocks, "block");
    });
    it("entities", () => {
      TestContent(edu.entities, vanilla.entities, "entity");
    });
    it("items", () => {
      TestContent(edu.items, vanilla.items, "item");
    });
    it("effects", () => {
      TestContent(edu.effects, vanilla.effects, "sound");
    });
    it("sounds", () => {
      TestContent(edu.sounds, vanilla.sounds, "sound");
    });
  });
});

function TestContent(edu: string[], vanilla: string[], type: string): void {
  for (let I = 0; I < edu.length; I++) {
    const elem = edu[I];

    if (vanilla.includes(elem)) expect.fail(`${elem} is in ${type} vanilla data`);
  }
}
