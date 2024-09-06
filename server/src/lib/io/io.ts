import { existsSync, lstatSync } from "fs";
import { IExtendedLogger } from "../lsp/logger/logger";

export function isDirectory(path: string, logger: IExtendedLogger): boolean {
  try {
    return lstatSync(path).isDirectory();
  } catch (err: any) {
    logger.error(`error during the checking isDirectory: ${path}`, err);
  }

  return false;
}

export function isFile(path: string, logger: IExtendedLogger): boolean {
  try {
    return lstatSync(path).isFile();
  } catch (err: any) {
    logger.error(`error during the checking isFile: ${path}`, err);
  }

  return false;
}

export function exists(path: string, logger: IExtendedLogger): boolean {
  try {
    return existsSync(path);
  } catch (err: any) {
    logger.error(`error during the checking exists: ${path}`, err);
  }

  return false;
}
