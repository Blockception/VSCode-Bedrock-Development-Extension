import { HandleError } from "../../util/error";
import { Fs } from "../../util/url";
import { IExtendedLogger } from "../logger/logger";

import * as fs from "fs";

/**
 * Tries to read the file from disk
 * @param uri The vscode uri of the document to retrieve
 * @param logger The logger to report error and information to
 * @returns The contents of the file or undefined when an error occured
 */
export function readDocument(uri: string, logger: IExtendedLogger): string | undefined {
  //Reading file
  const path = Fs.FromVscode(uri);
  logger.debug(`reading file: ${uri}`);

  if (fs.existsSync(path)) {
    try {
      return fs.readFileSync(path, "utf8");
    } catch (error) {
      HandleError(error, logger, uri);
    }
  }

  return undefined;
}
