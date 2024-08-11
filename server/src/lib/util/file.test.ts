import path from "path";
import { getExtension, getFilename, getParent } from "./file";

const filename = "I am a filepath.json";
const Extention = ".json";
const parent = "C:\\temp";
const Fullpath = path.join(parent, filename);

describe("File", () => {
  test("GetFilename", () => {
    const fname = getFilename(Fullpath);

    expect(fname).toEqual("I am a filepath");
  });

  test("getExtension", () => {
    const Ext = getExtension(Fullpath);

    expect(Ext).toEqual(Extention);
  });

  test("GetParent", () => {
    const P = getParent(Fullpath);

    expect(P).toEqual(parent + path.sep);
  });
});
