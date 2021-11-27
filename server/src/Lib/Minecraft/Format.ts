import { BehaviorPack, Pack, ResourcePack } from "bc-minecraft-bedrock-project";
import { Glob } from "../Glob/Glob";

export namespace MinecraftFormat {
  /**
   *
   * @param folder
   * @param ignores
   * @returns
   */
  export function GetManifests(folder: string, ignores: string[]): string[] {
    return Glob.GetFiles(["manifest.json", "**/manifest.json"], ignores, folder, true);
  }

  /**
   *
   * @param folder
   * @param ignores
   * @returns
   */
  export function GetBehaviorPackFiles(folder: string, ignores: string[]): string[] {
    return Glob.GetFiles(["**/*.{json,jsonc,json5}", "*.{json,jsonc,json5}", "*.mcfunction", "**/*.mcfunction", "**/*.lang", "*.lang"], ignores, folder);
  }

  /**
   *
   * @param folder
   * @param ignores
   * @returns
   */
  export function GetResourcePackFiles(folder: string, ignores: string[]): string[] {
    return Glob.GetFiles(["**/*.{json,jsonc,json5}", "*.{json,jsonc,json5}", "**/*.lang", "*.lang"], ignores, folder);
  }

  /**
   *
   * @param folder
   * @param ignores
   * @returns
   */
  export function GetPackFiles(pack: Pack): string[] {
    const ignores = pack.context.ignores.patterns;
    const folder = pack.folder;
    let files: string[];

    //TODO use Util
    if (BehaviorPack.BehaviorPack.is(pack)) {
      files = MinecraftFormat.GetBehaviorPackFiles(folder, ignores);
    } else if (ResourcePack.ResourcePack.is(pack)) {
      files = MinecraftFormat.GetResourcePackFiles(folder, ignores);
    } else {
      files = MinecraftFormat.GetBehaviorPackFiles(folder, ignores);
    }

    return files;
  }

  /**
   *
   * @param folder
   * @param ignores
   */
  export function GetAudioFiles(folder: string, ignores: string[]) {
    return Glob.GetFiles(["sounds/**/*.ogg", "sounds/*.ogg", "sounds/**/*.fsb", "sounds/*.fsb"], ignores, folder);
  }

  /**
   *
   * @param folder
   * @param ignores
   */
  export function GetTextureFiles(folder: string, ignores: string[]) {
    return Glob.GetFiles(["textures/**/*.png", "textures/*.png", "textures/**/*.tga", "textures/*.tga"], ignores, folder);
  }

  /**
   *
   * @param folder
   * @param ignores
   */
  export function GetStructureFiles(folder: string, ignores: string[]) {
    return Glob.GetFiles(["**/*.mcstructure", "*.mcstructure"], ignores, folder);
  }
}
