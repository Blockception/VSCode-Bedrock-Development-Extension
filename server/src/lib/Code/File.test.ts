import { expect } from "chai";
import path from "path";
import { getExtension, GetFilename, GetParent } from "./File";

const Filename = "I am a filepath.json";
const Extention = ".json";
const Parent = "C:\\temp";
const Fullpath = path.join(Parent, Filename);

describe("File", () => {
  it("GetFilename", () => {
    const Fname = GetFilename(Fullpath);

    expect(Fname).to.equal("I am a filepath");
  });

  it("getExtension", () => {
    const Ext = getExtension(Fullpath);

    expect(Ext).to.equal(Extention);
  });

  it("GetParent", () => {
    const P = GetParent(Fullpath);

    expect(P).to.equal(Parent + path.sep);
  });
});
