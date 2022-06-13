import { expect } from "chai";
import FastGlob from "fast-glob";
import path from "path";
import { Vscode } from "../src/Lib/Code/Url";
import { Glob } from "../src/Lib/Glob/Glob";
import { MinecraftFormat } from "../src/Lib/Minecraft/Format";

//THis is made to test FS systems where the plugin will run on
describe("Glob", () => {
  const folder = Vscode.FromFs(path.resolve(__dirname, "files"));
  
  describe("Direct", () => {
    it("Json", () => {
      const cwd = Glob.FolderPath(folder);

      const options: FastGlob.Options = { onlyFiles: true, absolute: true, cwd: cwd, baseNameMatch: undefined };
      const files = FastGlob.sync(["**/*.json", "*.json"], options);

      expect(files.length, cwd).to.be.greaterThan(0);
    });
  });

  describe("GetFiles", () => {
    it("Json", () => {
      const files = Glob.GetFiles("**/*.json", [], folder);

      expect(files.length, folder).to.be.greaterThan(0);
    });

    it("Json2", () => {
      const files = Glob.GetFiles(["**/*.json", "*.json"], [], folder);

      expect(files.length, folder).to.be.greaterThan(0);
    });

    it("Mcfunction", () => {
      const files = Glob.GetFiles("**/*.mcfunction", [], folder);

      expect(files.length, folder).to.be.greaterThan(0);
    });

    it("Mcfunction2", () => {
      const files = Glob.GetFiles(["*.mcfunction", "**/*.mcfunction"], [], folder);

      expect(files.length, folder).to.be.greaterThan(0);
    });
  });

  it("GetBehaviorPackFiles", () => {
    const files = MinecraftFormat.GetBehaviorPackFiles(folder, []);

    expect(files.length, folder).to.be.greaterThan(0);
  });
});
