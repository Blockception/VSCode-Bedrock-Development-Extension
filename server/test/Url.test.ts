import { expect } from "chai";
import * as fs from "fs";
import path from "path";
import { URI } from "vscode-uri";
import { Fs, Vscode } from "../src/Lib/Code/Url";

describe("URL", () => {
  describe("Fs", () => {
    describe("folders", () => {
      const folders = [path.resolve(__dirname, "files"), Fs.FromVscode(Vscode.FromFs(path.resolve(__dirname, "files")))];

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

      for (let I = 0; I < files.length; I++) {
        const f = files[I];
        it(f, () => CheckFile(f, true));
      }
    });
  });
});

function CheckFolder(folder: string, result: boolean) {
  if (result) {
    //console.log("checking folder exists: " + folder);
    expect(fs.existsSync(folder), folder).to.be.true;
    expect(fs.lstatSync(folder).isFile()).to.be.false;
  } else {
    expect(fs.existsSync(folder), folder).to.be.false;
  }
}

function CheckFile(file: string, result: boolean) {
  if (result) {
    //console.log("checking file exists: " + file);
    expect(fs.existsSync(file), file).to.be.true;
    expect(fs.lstatSync(file).isFile()).to.be.true;
  } else {
    expect(fs.existsSync(file), file).to.be.false;
  }
}
