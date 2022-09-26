import { expect } from "chai";
import path from "path";
import { Fs, Vscode } from "./Url";

describe("Url", () => {
  describe("Vscode", () => {
    describe("FromFs", () => {
      const folderFs = path.resolve(__dirname, "test");
      const folder = Vscode.FromFs(folderFs);

      it("Is not vscode folder", () => {
        expect(Vscode.isVscode(folderFs)).to.be.false;
      });

      it("Is vscode folder", () => {
        expect(Vscode.isVscode(folder)).to.be.true;
      });
    });

    describe("isVscode", () => {
      it("Is not vscode folder", () => {
        expect(Vscode.isVscode("f:/folder/behavior_packs/temp-bp/blocks/example.block.json")).to.be.false;
      });

      it("Is vscode folder", () => {
        expect(Vscode.isVscode("file:///f%3A/folder/behavior_packs/temp-bp/blocks/example.block.json")).to.be.true;
      });
    });

    it("Combine", ()=>{
      const folder = "file:///f%3A/folder/behavior_packs/";
      const combined = Vscode.join(folder, "test", "test2", "test3");
      expect(combined).to.equal("file:///f%3A/folder/behavior_packs/test/test2/test3");
    })

    it("Combine with slashes", ()=>{
      const folder = "file:///f%3A/folder/behavior_packs";
      const combined = Vscode.join(folder, "test", "/test2", "/test3");
      expect(combined).to.equal("file:///f%3A/folder/behavior_packs/test/test2/test3");
    })
  });
});
