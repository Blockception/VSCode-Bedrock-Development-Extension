import { expect } from "chai";
import { Command, Parameter } from ".";

describe("include", () => {
  it("Sanity", () => {
    expect(Parameter).to.not.be.undefined;
    expect(Parameter.ProvideCompletion).to.not.be.undefined;
		
    expect(Command).to.not.be.undefined;
    expect(Command.GetPossibleEntityTypes).to.not.be.undefined;
    expect(Command.ProvideCompletion).to.not.be.undefined;
    expect(Command.ProvideReferences).to.not.be.undefined;
    expect(Command.ProvideSignature).to.not.be.undefined;
  });
});
