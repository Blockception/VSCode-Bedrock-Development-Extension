import { assert, expect } from "chai";
import { GetResourcePack } from "./Functions";

describe("Resourcepack Functions", () => {
  it("GetResourcePack", () => {
    const path = GetResourcePack("file:///f%3A/Projects/Org%20B/Project-Foo/1.%20Resource%20Pack-RP/sounds/sound_definitions.json", "sounds");

    expect(path).to.equal("f%3A/Projects/Org%20B/Project-Foo/1.%20Resource%20Pack-RP");
  });
});
