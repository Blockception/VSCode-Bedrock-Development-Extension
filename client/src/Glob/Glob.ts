import FastGlob from "fast-glob";
import pm from "picomatch";
import { Fs, Vscode } from "../Code/Url";

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
   * @param source
   * @param ignores
   * @param cwd The working directory
   * @param baseNameMatch
   * @returns
   */
  export function GetFiles(
    source: string | string[],
    ignores: string[] | undefined = undefined,
    cwd: string | undefined = undefined,
    baseNameMatch: boolean | undefined = undefined
  ): string[] {
    if (cwd) cwd = FolderPath(cwd);

    const options: FastGlob.Options = { onlyFiles: true, absolute: true, cwd: cwd, baseNameMatch: baseNameMatch };
    let entries = FastGlob.sync(source, options);

    if (ignores && ignores.length > 0) entries = Excludes(entries, ignores);

    return entries.map(Vscode.FromFs);
  }

  /**
   *
   * @param folder
   */
  export function FolderPath(folder: string): string {
    return Fs.FromVscode(folder).replace(/\\/gi, "/");
  }

  /**Ensures the source is glob friendly
   * @param source*/
  export function EnsureSources(source: string | string[]): string | string[] {
    if (typeof source == "string") {
      return InternalEnsureSource(source);
    }

    return source.map(InternalEnsureSource);
  }

  /**Ensures the source is glob friendly
   * @param source*/
  export function EnsureSource(source: string): string {
    return InternalEnsureSource(source);
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
