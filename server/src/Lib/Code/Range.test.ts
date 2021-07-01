import { expect } from "chai";
import { Range } from "./Range";
import * as vs from "vscode-languageserver-textdocument";
import { Location } from "vscode-languageserver";

describe("Range", () => {
  it("Wihtin Range", () => {
    const R: vs.Range = { start: { character: 10, line: 1 }, end: { character: 5, line: 2 } };

    expect(Range.Within(R, { line: 1, character: 11 }), `${1}-${11}`).to.be.true;
    expect(Range.Within(R, { line: 2, character: 4 }), `${2}-${4}`).to.be.true;

    expect(Range.Within(R, { line: 1, character: 9 }), `${1}-${9}`).to.be.false;
    expect(Range.Within(R, { line: 2, character: 6 }), `${2}-${6}`).to.be.false;
  });

  it("Wihtin Location", () => {
    const R: vs.Range = { start: { character: 10, line: 1 }, end: { character: 5, line: 2 } };
    const L: Location = Location.create("", R);

    expect(Range.Within(L, { line: 1, character: 11 }), `${1}-${11}`).to.be.true;
    expect(Range.Within(L, { line: 2, character: 4 }), `${2}-${4}`).to.be.true;

    expect(Range.Within(L, { line: 1, character: 9 }), `${1}-${9}`).to.be.false;
    expect(Range.Within(L, { line: 2, character: 6 }), `${2}-${6}`).to.be.false;
  });

  it("Wihtin Range 2", () => {
    const R: vs.Range = { start: { character: 2, line: 1 }, end: { character: 12, line: 1 } };

    for (var I = 3; I < 12; I++) {
      expect(Range.Within(R, I)).to.be.true;
    }

    expect(Range.Within(R, { line: 1, character: 1 })).to.be.false;
    expect(Range.Within(R, { line: 2, character: 13 })).to.be.false;
  });

  it("Wihtin Location 2", () => {
    const R: vs.Range = { start: { character: 2, line: 1 }, end: { character: 12, line: 1 } };
    const L: Location = Location.create("", R);

    for (var I = 3; I < 12; I++) {
      expect(Range.Within(R, I)).to.be.true;
    }

    expect(Range.Within(R, { line: 1, character: 1 })).to.be.false;
    expect(Range.Within(R, { line: 2, character: 13 })).to.be.false;
  });
});
