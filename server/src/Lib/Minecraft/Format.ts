import { Pack, Util } from "bc-minecraft-bedrock-project";
import { Glob } from "../Glob/Glob";

export namespace MinecraftFormat {
  /**
   * Gets the manifest files from the folder
   * @param folder The folder to spit start at looking from
   * @param ignores The glob patterns to ignore
   * @returns
   */
  export function GetManifests(folder: string, ignores: string[]): string[] {
    return Glob.GetFiles(["manifest.json", "**/manifest.json"], ignores, folder, true);
  }

  /**
   * Gets the behaviorpack files from the folder
   * @param folder The folder to spit start at looking from
   * @param ignores The glob patterns to ignore
   * @returns
   */
  export function GetBehaviorPackFiles(folder: string, ignores: string[]): string[] {
    return Glob.GetFiles(
      ["**/*.{json,jsonc,json5}", "*.{json,jsonc,json5}", "*.mcfunction", "**/*.mcfunction", "**/*.lang", "*.lang"],
      ignores,
      folder
    );
  }

  /**
   * Gets the resourcepack files from the folder
   * @param folder The folder to spit start at looking from
   * @param ignores The glob patterns to ignore
   * @returns
   */
  export function GetResourcePackFiles(folder: string, ignores: string[]): string[] {
    return Glob.GetFiles(["**/*.{json,jsonc,json5}", "*.{json,jsonc,json5}", "**/*.lang", "*.lang"], ignores, folder);
  }

  /**
   * Retrieves the relevant files located inside the folder of the pack
   * @param pack The pack to get the files from
   * @returns A list of files
   */
  export function GetPackFiles(pack: Pack): string[] {
    const ignores = pack.context.ignores.patterns;
    const folder = pack.folder;
    let files: string[];

    if (Util.IsBehaviorPack(pack)) {
      files = MinecraftFormat.GetBehaviorPackFiles(folder, ignores);
    } else if (Util.IsResourcePack(pack)) {
      files = MinecraftFormat.GetResourcePackFiles(folder, ignores);
    } else {
      files = MinecraftFormat.GetBehaviorPackFiles(folder, ignores);
    }

    return files;
  }

  /**
   * Gets the minecraft audio files from the folder
   * @param folder The folder to spit start at looking from
   * @param ignores The glob patterns to ignore
   */
  export function GetAudioFiles(folder: string, ignores: string[]) {
    return Glob.GetFiles(["sounds/**/*.ogg", "sounds/*.ogg", "sounds/**/*.fsb", "sounds/*.fsb"], ignores, folder);
  }

  /**
   * Gets the minecraft texture files from the folder
   * @param folder The folder to spit start at looking from
   * @param ignores The glob patterns to ignore
   */
  export function GetTextureFiles(folder: string, ignores: string[]) {
    return Glob.GetFiles(["textures/**/*.png", "textures/*.png", "textures/**/*.tga", "textures/*.tga"], ignores, folder);
  }

  /**
   * Gets the minecraft structure files from the folder
   * @param folder The folder to spit start at looking from
   * @param ignores The glob patterns to ignore
   */
  export function GetStructureFiles(folder: string, ignores: string[]) {
    return Glob.GetFiles(["**/*.mcstructure", "*.mcstructure"], ignores, folder);
  }
}
