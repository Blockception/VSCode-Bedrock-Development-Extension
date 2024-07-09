import { expect } from "chai";
import { Command } from ".";

describe("include", () => {
  it("Sanity", () => {
    expect(Command).to.not.be.undefined;
    expect(Command.GetPossibleEntityTypes).to.not.be.undefined;
    expect(Command.provideReferences).to.not.be.undefined;
    expect(Command.provideSignature).to.not.be.undefined;
  });
});
