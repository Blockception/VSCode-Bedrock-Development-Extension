import FastGlob from "fast-glob";
import pm from "picomatch";
import { URL } from "url";
import { URI } from "vscode-uri";
import { GetResourcePack } from "../Types/Minecraft/Resource/Functions";

/**
 *
 */
export namespace Glob {
  const opt: pm.PicomatchOptions = {
    contains: true,
  };

  /**
   *
   * @param source
   * @param ignores
   * @returns
   */
  export function Excludes(source: string[], ignores: string[]): string[] {
    return source.filter((x) => !pm.isMatch(x, ignores, opt));
  }

  /**
   *
   * @param source
   * @param patterns
   * @returns
   */
  export function IsMatch(source: string, patterns: string[]): boolean {
    return pm.isMatch(source, patterns, opt);
  }

  /**
   *
   */
  export function GetFiles(source: string | string[], ignores: string[] | undefined = undefined): string[] {
    let entries = FastGlob.sync(source, { onlyFiles: true, absolute: true });

    if (ignores && ignores.length > 0) entries = Excludes(entries, ignores);
    return entries.map((item) => URI.file(item).toString());
  }

  /**Ensures the source is glob friendly
   * @param source
   */
  export function EnsureSource(source: string | string[]): string | string[] {
    if (typeof source == "string") {
      return InternalEnsureSource(source);
    }

    return source.map(InternalEnsureSource);
  }

  function InternalEnsureSource(source: string): string {
    source = decodeURI(source);
    source = source.replace(/%3A/gi, ":");
    source = source.replace(/\\/gi, "/");

    if (source.startsWith("file:///")) source = source.substring(8);
    else if (source.startsWith("file://")) source = source.substring(7);

    return source;
  }
}
