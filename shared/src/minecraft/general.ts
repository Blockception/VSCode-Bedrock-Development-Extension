import { readdirSync } from "fs";
import path = require("path");

export function findInFolder(base: string, find: string): string | undefined {
  const folders = readdirSync(base);

  for (let I = 0; I < folders.length; I++) {
    const f = folders[I];

    if (f.includes(find)) {
      return path.join(base, f);
    }
  }

  return undefined;
}
