import { expect } from "chai";
import { Command, Parameter } from ".";

describe("include", () => {
  it("Sanity", () => {
    expect(Parameter).to.not.be.undefined;
    expect(Parameter.provideCompletion).to.not.be.undefined;
		
    expect(Command).to.not.be.undefined;
    expect(Command.GetPossibleEntityTypes).to.not.be.undefined;
    expect(Command.provideCompletion).to.not.be.undefined;
    expect(Command.provideReferences).to.not.be.undefined;
    expect(Command.provideSignature).to.not.be.undefined;
  });
});
