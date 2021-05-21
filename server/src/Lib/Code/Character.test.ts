import { expect } from "chai";
import { Character } from "./Character";

describe("Character", () => {
  it("IsLetter", () => {
    expect(Character.IsLetter("a")).to.true;
    expect(Character.IsLetter("A")).to.true;
    expect(Character.IsLetter("z")).to.true;
    expect(Character.IsLetter("z")).to.true;

    expect(Character.IsLetter("0")).to.false;
    expect(Character.IsLetter("5")).to.false;
    expect(Character.IsLetter("$")).to.false;
    expect(Character.IsLetter("%")).to.false;
  });

  it("IsNumber", () => {
    expect(Character.IsNumber("0")).to.true;
    expect(Character.IsNumber("5")).to.true;

    expect(Character.IsNumber("a")).to.false;
    expect(Character.IsNumber("A")).to.false;
    expect(Character.IsNumber("z")).to.false;
    expect(Character.IsNumber("z")).to.false;

    expect(Character.IsNumber("$")).to.false;
    expect(Character.IsNumber("%")).to.false;
  });
});
