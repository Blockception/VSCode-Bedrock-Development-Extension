import { expect } from "chai";
import { IsBoolean } from "./include";

describe("Boolean", () => {
  it("IsBoolean", () => {
    expect(IsBoolean("true")).to.equal(true);
    expect(IsBoolean("True")).to.equal(true);
    expect(IsBoolean("false")).to.equal(true);
    expect(IsBoolean("False")).to.equal(true);

    expect(IsBoolean("foo")).to.equal(false);
    expect(IsBoolean("1")).to.equal(false);
    expect(IsBoolean("0")).to.equal(false);
  });
});
