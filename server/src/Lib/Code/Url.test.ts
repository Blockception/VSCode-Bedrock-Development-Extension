import { expect } from "chai";
import path from "path";
import { Fs, Vscode } from "./Url";

describe("Url", () => {
  describe("Vscode", () => {
    it("FromFs",()=>{
      const folderFs = path.resolve(__dirname, "test");
      const folder = Vscode.FromFs(folderFs);

      expect(Vscode.isVscode(folderFs)).to.be.true;
      expect(Vscode.isVscode(folder)).to.be.false;
    })

    it("isVscode",()=>{
      expect(Vscode.isVscode("file:///f%3A/folder/behavior_packs/temp-bp/blocks/example.block.json")).to.be.true;
      expect(Vscode.isVscode("f:/folder/behavior_packs/temp-bp/blocks/example.block.json")).to.be.false;
    })
    
  });
});
