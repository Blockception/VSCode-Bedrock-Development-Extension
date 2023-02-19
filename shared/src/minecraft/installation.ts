import { readdirSync } from "fs";
import path = require("path");
import { findInFolder } from "./general";

/**
 *
 * @returns
 */
export function GetBedrockInstallationFolder(): string {
  let base: string | undefined;

  switch (process.platform) {
    case "win32":
      base = GetBedrockWinsInstallationFolder();
      break;

    case "aix":
    case "darwin":
    case "freebsd":
    case "linux":
    case "openbsd":
    case "sunos":
      throw new Error(`Unknown platform, ${process.platform} please make an issue on github :D`);
  }

  if (!base) {
    throw new Error("Installation folder not found");
  }

  return base;
}

function GetBedrockWinsInstallationFolder(): string | undefined {
  let ProgramFiles = process.env.ProgramFiles;

  if (ProgramFiles) {
    return findInFolder(path.join(ProgramFiles, "WindowsApps"), "Microsoft.MinecraftUWP");
  }

  return "";
}
