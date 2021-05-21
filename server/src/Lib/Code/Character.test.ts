import { expect } from "chai";
import { Character } from "./Character";

describe("Character", () => {
  it("IsLetter", () => {
    expect(Character.IsLetter("a"), "a").to.true;
    expect(Character.IsLetter("A"), "A").to.true;
    expect(Character.IsLetter("z"), "z").to.true;
    expect(Character.IsLetter("Z"), "Z").to.true;

    expect(Character.IsLetter("0"), "0").to.false;
    expect(Character.IsLetter("5"), "5").to.false;
    expect(Character.IsLetter("$"), "$").to.false;
    expect(Character.IsLetter("%"), "%").to.false;
  });

  it("IsNumber", () => {
    expect(Character.IsNumber("0"), "0").to.true;
    expect(Character.IsNumber("5"), "5").to.true;

    expect(Character.IsNumber("a"), "a").to.false;
    expect(Character.IsNumber("A"), "A").to.false;
    expect(Character.IsNumber("z"), "z").to.false;
    expect(Character.IsNumber("Z"), "Z").to.false;

    expect(Character.IsNumber("$"), "$").to.false;
    expect(Character.IsNumber("%"), "%").to.false;
  });
});
