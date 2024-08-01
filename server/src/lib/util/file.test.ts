import path from "path";
import { getExtension, getFilename, GetParent } from "./file";

const Filename = "I am a filepath.json";
const Extention = ".json";
const Parent = "C:\\temp";
const Fullpath = path.join(Parent, Filename);

describe("File", () => {
  test("GetFilename", () => {
    const Fname = getFilename(Fullpath);

    expect(Fname).toEqual("I am a filepath");
  });

  test("getExtension", () => {
    const Ext = getExtension(Fullpath);

    expect(Ext).toEqual(Extention);
  });

  test("GetParent", () => {
    const P = GetParent(Fullpath);

    expect(P).toEqual(Parent + path.sep);
  });
});
