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

  it("IsUpperCase", () => {
    expect(Character.IsUppercase("A"), "A").to.true;
    expect(Character.IsUppercase("Z"), "Z").to.true;
    
    expect(Character.IsUppercase("a"), "a").to.false;
    expect(Character.IsUppercase("z"), "z").to.false;
    expect(Character.IsUppercase("0"), "0").to.false;
    expect(Character.IsUppercase("5"), "5").to.false;
    expect(Character.IsUppercase("$"), "$").to.false;
    expect(Character.IsUppercase("%"), "%").to.false;
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

  it("IsLetter Code", () => {
    expect(Character.IsLetterCode("a".charCodeAt(0)), "a").to.true;
    expect(Character.IsLetterCode("A".charCodeAt(0)), "A").to.true;
    expect(Character.IsLetterCode("z".charCodeAt(0)), "z").to.true;
    expect(Character.IsLetterCode("Z".charCodeAt(0)), "Z").to.true;

    expect(Character.IsLetterCode("0".charCodeAt(0)), "0").to.false;
    expect(Character.IsLetterCode("5".charCodeAt(0)), "5").to.false;
    expect(Character.IsLetterCode("$".charCodeAt(0)), "$").to.false;
    expect(Character.IsLetterCode("%".charCodeAt(0)), "%").to.false;
  });

  it("IsNumber Code", () => {
    expect(Character.IsNumberCode("0".charCodeAt(0)), "0").to.true;
    expect(Character.IsNumberCode("5".charCodeAt(0)), "5").to.true;

    expect(Character.IsNumberCode("a".charCodeAt(0)), "a").to.false;
    expect(Character.IsNumberCode("A".charCodeAt(0)), "A").to.false;
    expect(Character.IsNumberCode("z".charCodeAt(0)), "z").to.false;
    expect(Character.IsNumberCode("Z".charCodeAt(0)), "Z").to.false;

    expect(Character.IsNumberCode("$".charCodeAt(0)), "$").to.false;
    expect(Character.IsNumberCode("%".charCodeAt(0)), "%").to.false;
  });
});
