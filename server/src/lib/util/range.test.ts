import { Range } from "./range";
import * as vs from "vscode-languageserver-textdocument";
import { Location } from "vscode-languageserver";

describe("Range", () => {
  test("should be within range", () => {
    const R: vs.Range = { start: { character: 10, line: 1 }, end: { character: 5, line: 2 } };

    expect(Range.Within(R, { line: 1, character: 11 })).toBeTruthy;
    expect(Range.Within(R, { line: 2, character: 4 })).toBeTruthy;

    expect(Range.Within(R, { line: 1, character: 9 })).toBeFalsy;
    expect(Range.Within(R, { line: 2, character: 6 })).toBeFalsy;
  });

  test("location should be within range", () => {
    const R: vs.Range = { start: { character: 10, line: 1 }, end: { character: 5, line: 2 } };
    const L: Location = Location.create("", R);

    expect(Range.Within(L, { line: 1, character: 11 })).toBeTruthy;
    expect(Range.Within(L, { line: 2, character: 4 })).toBeTruthy;

    expect(Range.Within(L, { line: 1, character: 9 })).toBeFalsy;
    expect(Range.Within(L, { line: 2, character: 6 })).toBeFalsy;
  });

  test("extensive within range", () => {
    const R: vs.Range = { start: { character: 2, line: 1 }, end: { character: 12, line: 1 } };

    for (var I = 3; I < 12; I++) {
      expect(Range.Within(R, I)).toBeTruthy;
    }

    expect(Range.Within(R, { line: 1, character: 1 })).toBeFalsy;
    expect(Range.Within(R, { line: 2, character: 13 })).toBeFalsy;
  });

  test("extensive within range", () => {
    const R: vs.Range = { start: { character: 2, line: 1 }, end: { character: 12, line: 1 } };
    const L: Location = Location.create("", R);

    for (var I = 3; I < 12; I++) {
      expect(Range.Within(R, I)).toBeTruthy;
    }

    expect(Range.Within(R, { line: 1, character: 1 })).toBeFalsy;
    expect(Range.Within(R, { line: 2, character: 13 })).toBeFalsy;
  });
});
