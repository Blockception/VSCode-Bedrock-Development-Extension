import { Glob } from "../Glob/Glob";

export namespace MinecraftFormat {
  /**
   *
   * @param folder
   * @param ignores
   * @returns
   */
  export function GetManifests(folder: string, ignores: string[]): string[] {
    return Glob.GetFiles(["manifest.json"], ignores, folder, true);
  }

  /**
   *
   * @param folder
   * @param ignores
   * @returns
   */
  export function GetBehaviorPackFiles(folder: string, ignores: string[]): string[] {
    return Glob.GetFiles(["**/*.json", "*.json", "*.mcfunction"], ignores, folder);
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
  export function GetPackFiles(folder: string, ignores: string[]): string[] {
    return Glob.GetFiles(["**/*.json", "*.json", "*.mcfunction"], ignores, folder);
  }
}
