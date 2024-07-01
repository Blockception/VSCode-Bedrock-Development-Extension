import { expect } from "chai";
import { BehaviorPack, Commands, General, Json, Language, Mcfunction, MCProject, Modes, Molang, ResourcePack } from ".";

describe("include", () => {
  it("Sanity", () => {
    expect(BehaviorPack).to.not.be.undefined;

    expect(BehaviorPack).to.not.be.undefined;
    expect(Commands).to.not.be.undefined;
    expect(General).to.not.be.undefined;
    expect(Json).to.not.be.undefined;
    expect(Language).to.not.be.undefined;
    expect(MCProject).to.not.be.undefined;
    expect(Mcfunction).to.not.be.undefined;
    expect(Modes).to.not.be.undefined;
    expect(Molang).to.not.be.undefined;
    expect(ResourcePack).to.not.be.undefined;
  });
});
