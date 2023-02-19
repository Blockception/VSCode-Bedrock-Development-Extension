import path = require('path');
import { findInFolder } from './general';


export function GetBedrockDataFolder(): string {
  let base: string | undefined;

  switch (process.platform) {
    case "win32":
      base = GetBedrockWinsDataFolder();
      break;

    case 'aix':
    case 'darwin':
    case 'freebsd':
    case 'linux':
    case 'openbsd':
    case 'sunos':
      throw new Error(`Unknown platform, ${process.platform} please make an issue on github :D`);
  }

  if (!base) {
    throw new Error("Installation folder not found");
  }

  return base;
}

function GetBedrockWinsDataFolder(): string | undefined {
  let AppDataLocal = process.env.LOCALAPPDATA;

  if (AppDataLocal) {
    return findInFolder(path.join(AppDataLocal, "Packages"), "Microsoft.MinecraftUWP");
  }

  return "";
}