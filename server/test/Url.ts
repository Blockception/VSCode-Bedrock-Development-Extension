import { expect } from "chai";
import * as fs from "fs";
import path from "path";
import { Fs, Vscode } from "../src/Lib/Code/Url";

describe("URL", () => {
  describe("Fs", () => {
    describe("folders", () => {
      const folders = [Fs.UniformFolder(path.join(__dirname, "files")), Fs.UniformFolder(Vscode.UniformFolder(path.join(__dirname, "files")))];

      folders.forEach((f) => it(f, () => CheckFolder(f, true)));
    });

    describe("files", () => {
      const files = [
        Fs.UniformFolder(path.join(__dirname, "files", "example.entity.json")),
        Fs.UniformFolder(Vscode.UniformFolder(path.join(__dirname, "files", "example.entity.json"))),
      ];

      files.forEach((f) => it(f, () => CheckFile(f, true)));
    });
  });
});

function CheckFolder(folder: string, result: boolean) {
  if (result) {
    expect(fs.existsSync(folder), folder).to.be.true;
    expect(fs.lstatSync(folder).isFile).to.be.false;
  } else {
    expect(fs.existsSync(folder), folder).to.be.false;
  }
}

function CheckFile(file: string, result: boolean) {
  if (result) {
    expect(fs.existsSync(file), file).to.be.true;
    expect(fs.lstatSync(file).isFile).to.be.true;
  } else {
    expect(fs.existsSync(file), file).to.be.false;
  }
}
