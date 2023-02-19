import { expect } from "chai";
import { Languages, ToolIdentification } from "./Constants";

describe("Constants", () => {
  it("values", () => {
    expect(Languages.McFunctionIdentifier).to.equal(Languages.McFunctionIdentifier.toLowerCase());
  });

  it("Tool Identification", () => {
    expect(ToolIdentification.length).to.be.lessThanOrEqual(32);
  });
});
