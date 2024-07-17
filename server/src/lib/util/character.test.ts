import { Character } from "./character";

describe("Character", () => {
  const letters = ["a", "A", "z", "Z"];
  const not_letters = ["0", "5", "$", "%"];

  test.each(letters)(`IsLetter($letter)`, (letter) => {
    expect(Character.IsLetter(letter)).toBeTruthy;
  });

  test.each(not_letters)(`IsLetter($letter)`, (letter) => {
    expect(Character.IsLetter(letter)).toBeFalsy;
  });

  test("IsUpperCase", () => {
    expect(Character.IsUppercase("A")).toBeTruthy;
    expect(Character.IsUppercase("Z")).toBeTruthy;

    expect(Character.IsUppercase("a")).toBeFalsy;
    expect(Character.IsUppercase("z")).toBeFalsy;
    expect(Character.IsUppercase("0")).toBeFalsy;
    expect(Character.IsUppercase("5")).toBeFalsy;
    expect(Character.IsUppercase("$")).toBeFalsy;
    expect(Character.IsUppercase("%")).toBeFalsy;
  });

  test("IsNumber", () => {
    expect(Character.IsNumber("0")).toBeTruthy;
    expect(Character.IsNumber("5")).toBeTruthy;

    expect(Character.IsNumber("a")).toBeFalsy;
    expect(Character.IsNumber("A")).toBeFalsy;
    expect(Character.IsNumber("z")).toBeFalsy;
    expect(Character.IsNumber("Z")).toBeFalsy;

    expect(Character.IsNumber("$")).toBeFalsy;
    expect(Character.IsNumber("%")).toBeFalsy;
  });

  test("IsLetter Code", () => {
    expect(Character.IsLetterCode("a".charCodeAt(0))).toBeTruthy;
    expect(Character.IsLetterCode("A".charCodeAt(0))).toBeTruthy;
    expect(Character.IsLetterCode("z".charCodeAt(0))).toBeTruthy;
    expect(Character.IsLetterCode("Z".charCodeAt(0))).toBeTruthy;

    expect(Character.IsLetterCode("0".charCodeAt(0))).toBeFalsy;
    expect(Character.IsLetterCode("5".charCodeAt(0))).toBeFalsy;
    expect(Character.IsLetterCode("$".charCodeAt(0))).toBeFalsy;
    expect(Character.IsLetterCode("%".charCodeAt(0))).toBeFalsy;
  });

  test("IsNumber Code", () => {
    expect(Character.IsNumberCode("0".charCodeAt(0))).toBeTruthy;
    expect(Character.IsNumberCode("5".charCodeAt(0))).toBeTruthy;

    expect(Character.IsNumberCode("a".charCodeAt(0))).toBeFalsy;
    expect(Character.IsNumberCode("A".charCodeAt(0))).toBeFalsy;
    expect(Character.IsNumberCode("z".charCodeAt(0))).toBeFalsy;
    expect(Character.IsNumberCode("Z".charCodeAt(0))).toBeFalsy;

    expect(Character.IsNumberCode("$".charCodeAt(0))).toBeFalsy;
    expect(Character.IsNumberCode("%".charCodeAt(0))).toBeFalsy;
  });
});
