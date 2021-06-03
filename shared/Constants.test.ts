import { expect } from "chai";
import { Languages } from "./Constants";

describe("Constants", () => {
  it("values", () => {
    expect(Languages.McFunctionIdentifier).to.equal(Languages.McFunctionIdentifier.toLowerCase());
  });
});
