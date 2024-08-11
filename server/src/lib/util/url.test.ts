import path from "path";
import { Vscode } from "./url";

describe("Url", () => {
  describe("Vscode", () => {
    describe("FromFs", () => {
      const folderFs = path.resolve(__dirname, "test");
      const folder = Vscode.fromFs(folderFs);

      test("Is not vscode folder", () => {
        expect(Vscode.isVscode(folderFs)).toBeFalsy;
      });

      test("Is vscode folder", () => {
        expect(Vscode.isVscode(folder)).toBeTruthy;
      });
    });

    describe("isVscode", () => {
      test("Is not vscode folder", () => {
        expect(Vscode.isVscode("f:/folder/behavior_packs/temp-bp/blocks/example.block.json")).toBeFalsy;
      });

      test("Is vscode folder", () => {
        expect(Vscode.isVscode("file:///f%3A/Projects/Minecraft/minecraft-bedrock-samples/resource_pack/manifest.json")).toBeTruthy;
        expect(Vscode.isVscode("file:///f%3A/folder/behavior_packs/temp-bp/blocks/example.block.json")).toBeTruthy;
      });
    });

    test("Combine", ()=>{
      const folder = "file:///f%3A/folder/behavior_packs/";
      const combined = Vscode.join(folder, "test", "test2", "test3");
      expect(combined).toEqual("file:///f%3A/folder/behavior_packs/test/test2/test3");
    })

    test("Combine with slashes", ()=>{
      const folder = "file:///f%3A/folder/behavior_packs";
      const combined = Vscode.join(folder, "test", "/test2", "/test3");
      expect(combined).toEqual("file:///f%3A/folder/behavior_packs/test/test2/test3");
    })
  });
});
