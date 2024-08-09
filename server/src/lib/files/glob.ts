import FastGlob from "fast-glob";
import pm from "picomatch";
import { Fs, Vscode } from "../util";

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
  export function excludes(source: string[], ignores: string[]): string[] {
    return source.filter((x) => !pm.isMatch(x, ignores, opt));
  }

  /**
   *
   * @param source
   * @param patterns
   * @returns
   */
  export function isMatch(source: string, patterns: string[]): boolean {
    return pm.isMatch(source, patterns, opt);
  }

  /**
   *
   * @param source
   * @param ignores
   * @param cwd The working directory
   * @param baseNameMatch
   * @returns
   */
  export function getFiles(
    source: string | string[],
    ignores: string[] | undefined = undefined,
    cwd: string | undefined = undefined,
    baseNameMatch: boolean | undefined = undefined
  ): string[] {
    if (cwd) cwd = folderPath(cwd);

    const options: FastGlob.Options = { onlyFiles: true, absolute: true, cwd: cwd, baseNameMatch: baseNameMatch };
    let entries = FastGlob.sync(source, options);

    if (ignores && ignores.length > 0) entries = excludes(entries, ignores);

    return entries.map(Vscode.FromFs);
  }

  /**
   *
   * @param folder
   */
  export function folderPath(folder: string): string {
    return Fs.FromVscode(folder).replace(/\\/gi, "/");
  }

  /**Ensures the source is glob friendly
   * @param source*/
  export function ensureSources(source: string | string[]): string | string[] {
    if (typeof source == "string") {
      return internalEnsureSource(source);
    }

    return source.map(internalEnsureSource);
  }

  /**Ensures the source is glob friendly
   * @param source*/
  export function ensureSource(source: string): string {
    return internalEnsureSource(source);
  }

  function internalEnsureSource(source: string): string {
    source = decodeURI(source);
    source = source.replace(/%3A/gi, ":");
    source = source.replace(/\\/gi, "/");

    if (source.startsWith("file:///")) source = source.substring(8);
    else if (source.startsWith("file://")) source = source.substring(7);

    return source;
  }
}
