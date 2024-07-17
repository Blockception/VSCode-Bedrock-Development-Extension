import { URI } from "vscode-uri";
import { Fs, Vscode } from "../src/lib/util/url";

import * as fs from "fs";
import path from "path";

describe("URL", () => {
  describe("Fs", () => {
    describe("folders", () => {
      const folders = [
        path.resolve(__dirname, "files"),
        Fs.FromVscode(Vscode.FromFs(path.resolve(__dirname, "files"))),
      ];

      for (let I = 0; I < folders.length; I++) {
        const f = folders[I];
        it(f, () => CheckFolder(f, true));
      }
    });

    describe("files", () => {
      const files = [
        path.resolve(__dirname, "files", "example.entity.json"),
        Fs.FromVscode(Vscode.FromFs(path.resolve(__dirname, "files", "example.entity.json"))),
        Fs.FromVscode(URI.file(path.resolve(__dirname, "files", "example.entity.json")).path),
      ];

      test.each(files)("check file: $file", (file) => CheckFile(file, true));
    });
  });
});

function CheckFolder(folder: string, result: boolean) {
  if (result) {
    //console.log("checking folder exists: " + folder);
    expect(fs.existsSync(folder)).toBeTruthy;
    expect(fs.lstatSync(folder).isFile()).toBeFalsy;
  } else {
    expect(fs.existsSync(folder)).toBeFalsy;
  }
}

function CheckFile(file: string, result: boolean) {
  if (result) {
    //console.log("checking file exists: " + file);
    expect(fs.existsSync(file)).toBeTruthy;
    expect(fs.lstatSync(file).isFile()).toBeTruthy;
  } else {
    expect(fs.existsSync(file)).toBeFalsy;
  }
}
