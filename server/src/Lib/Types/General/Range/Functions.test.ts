import { expect } from "chai";
import { IsRangeInteger, IsRangeNumber } from "./Functions";

describe("Range", () => {
  it("IsRangeInteger", () => {
    expect(IsRangeInteger("..1")).to.true;
    expect(IsRangeInteger("7..")).to.true;
    expect(IsRangeInteger("5..10")).to.true;
  });

  it("IsRangeNumber", () => {
    expect(IsRangeNumber("..1")).to.true;
    expect(IsRangeNumber("7..")).to.true;
    expect(IsRangeNumber("5..10")).to.true;

    expect(IsRangeNumber("..1.2")).to.true;
    expect(IsRangeNumber("7.3..")).to.true;
    expect(IsRangeNumber("5.4156..10.1235")).to.true;
  });
});
