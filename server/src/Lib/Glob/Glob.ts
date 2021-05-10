import FastGlob from "fast-glob";
import pm from "picomatch";

export namespace Glob {
  const opt: pm.PicomatchOptions = {
    contains: true,
  };

  export function Excludes(source: string[], ignores: string[]): string[] {
    return source.filter((x) => !pm.isMatch(x, ignores, opt));
  }

  export function GetFiles(source: string | string[], ignores: string[] | undefined = undefined): string[] {
    let entries = FastGlob.sync(source, { onlyFiles: true, absolute: true });

    if (ignores && ignores.length > 0) entries = Excludes(entries, ignores);
    return entries;
  }
}
