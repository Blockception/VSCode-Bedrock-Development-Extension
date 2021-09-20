import { expect } from "chai";
import path from "path";
import { GetFilepath, GetVscodeFilepath, UniformFolder, UniformUrl, VscodeUniformUrl } from "./Url";

describe("Url", () => {
  describe("Vscode", () => {
    it("UniformUrl", () => {
      expect(VscodeUniformUrl("f:/temp folder/something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
      expect(VscodeUniformUrl("f:\\temp folder\\something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
      expect(VscodeUniformUrl("file:\\f:\\temp folder\\something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
      expect(VscodeUniformUrl("file:/f:/temp folder/something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
      expect(VscodeUniformUrl("file://f:/temp folder/something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
      expect(VscodeUniformUrl("/f:/temp folder/something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
      expect(VscodeUniformUrl("\\f:\\temp folder\\something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
    });

    it("Uri To Filepath", () => {
      expect(GetVscodeFilepath("file:///f%3A/temp%20folder/something.json")).to.equal("f:/temp folder/something.json");
    });

    it("Uri To Filepath2", () => {
      expect(GetVscodeFilepath("///f%3A/temp%20folder/something.json")).to.equal("f:/temp folder/something.json");
    });
  });

  describe("FS", () => {
    function normalize(p: string): string {
      return path.normalize(p).replace(/\//gi, path.sep);
    }

    it("UniformUrl", () => {
      //expect(UniformUrl("file://f:\\temp folder\\something.json")).to.equal(path.normalize("f:/temp folder/something.json"), "1");
      expect(UniformUrl("file://f:\\temp folder\\something.json")).to.equal(normalize("f:/temp folder/something.json"), "2");
      expect(UniformUrl("file://f:/temp%20folder/something.json")).to.equal(normalize("f:/temp folder/something.json"), "3");
      expect(UniformUrl("file://f:/temp%20folder/something.json")).to.equal(normalize("f:/temp folder/something.json"), "4");
      expect(UniformUrl("file://f:/temp folder/something.json")).to.equal(normalize("f:/temp folder/something.json"), "5");
      expect(UniformUrl("file://f:\\temp folder\\something.json")).to.equal(normalize("f:/temp folder/something.json"), "6");
    });

    it("Uniform Folder", () => {
      expect(UniformFolder("file:///f%3A/Projects/Blockception/Redstone%20Projects/Project-City-Maker2")).to.equal(
        normalize("f:/Projects/Blockception/Redstone Projects/Project-City-Maker2")
      );
    });

    it("Uri To Filepath", () => {
      expect(GetFilepath("file:///f%3A/temp%20folder/something.json")).to.equal(normalize("f:/temp folder/something.json"));
      expect(GetFilepath("f%3A/temp%20folder/something.json")).to.equal(normalize("f:/temp folder/something.json"));
    });

    it("Uri To Filepath2", () => {
      expect(GetFilepath("file:///f%3A/temp%20folder/something.json")).to.equal(normalize("f:/temp folder/something.json"));
      expect(GetFilepath("f%3A/temp%20folder/something.json")).to.equal(normalize("f:/temp folder/something.json"));
    });
  });
});
