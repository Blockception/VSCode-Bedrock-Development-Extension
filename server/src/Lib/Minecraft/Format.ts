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
    return Glob.GetFiles(["**/*.json", "*.json", "*.mcfunction", "**/*.mcfunction"], ignores, folder);
  }

  /**
   *
   * @param folder
   * @param ignores
   * @returns
   */
  export function GetResourcePackFiles(folder: string, ignores: string[]): string[] {
    return Glob.GetFiles(["**/*.json", "*.json"], ignores, folder);
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
}
