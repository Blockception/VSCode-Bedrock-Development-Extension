import { expect } from "chai";
import path from "path";
import { Fs, Vscode } from "./Url";

describe("Url", () => {
  describe("Vscode", () => {
    it("UniformUrl", () => {
      expect(Vscode.UniformUrl("f:/temp folder/something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
      expect(Vscode.UniformUrl("f:\\temp folder\\something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
      expect(Vscode.UniformUrl("file:\\f:\\temp folder\\something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
      expect(Vscode.UniformUrl("file:/f:/temp folder/something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
      expect(Vscode.UniformUrl("file://f:/temp folder/something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
      expect(Vscode.UniformUrl("/f:/temp folder/something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
      expect(Vscode.UniformUrl("\\f:\\temp folder\\something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
    });

    it("Uri To Filepath", () => {
      expect(Vscode.GetFilepath("file:///f%3A/temp%20folder/something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
    });

    it("Uri To Filepath2", () => {
      expect(Vscode.GetFilepath("///f%3A/temp%20folder/something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
    });
  });

  describe("FS", () => {
    function normalize(p: string): string {
      return path.normalize(p).replace(/\//gi, path.sep);
    }

    it("UniformUrl", () => {
      //expect(UniformUrl("file://f:\\temp folder\\something.json")).to.equal(path.normalize("f:/temp folder/something.json"), "1");
      expect(Fs.UniformUrl("file://f:\\temp folder\\something.json")).to.equal(normalize("f:/temp folder/something.json"), "2");
      expect(Fs.UniformUrl("file://f:/temp%20folder/something.json")).to.equal(normalize("f:/temp folder/something.json"), "3");
      expect(Fs.UniformUrl("file://f:/temp%20folder/something.json")).to.equal(normalize("f:/temp folder/something.json"), "4");
      expect(Fs.UniformUrl("file://f:/temp folder/something.json")).to.equal(normalize("f:/temp folder/something.json"), "5");
      expect(Fs.UniformUrl("file://f:\\temp folder\\something.json")).to.equal(normalize("f:/temp folder/something.json"), "6");
    });

    it("Uniform Folder", () => {
      expect(Fs.UniformFolder("file:///f%3A/Projects/Blockception/Redstone%20Projects/Project-City-Maker2")).to.equal(
        normalize("f:/Projects/Blockception/Redstone Projects/Project-City-Maker2")
      );
    });

    it("Uri To Filepath", () => {
      expect(Fs.GetFilepath("file:///f%3A/temp%20folder/something.json")).to.equal(normalize("f:/temp folder/something.json"));
      expect(Fs.GetFilepath("f%3A/temp%20folder/something.json")).to.equal(normalize("f:/temp folder/something.json"));
    });

    it("Uri To Filepath2", () => {
      expect(Fs.GetFilepath("file:///f%3A/temp%20folder/something.json")).to.equal(normalize("f:/temp folder/something.json"));
      expect(Fs.GetFilepath("f%3A/temp%20folder/something.json")).to.equal(normalize("f:/temp folder/something.json"));
    });
  });
});
