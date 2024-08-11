import { URI } from "vscode-uri";
import { IExtendedLogger } from "../logger/logger";

import * as fs from "fs";

/**
 * Tries to read the file from disk
 * @param uri The vscode uri of the document to retrieve
 * @param logger The logger to report error and information to
 * @returns The contents of the file or undefined when an error occured
 */
export function readDocument(uri: URI, logger: IExtendedLogger): string | undefined {
  //Reading file

  try {
    switch (uri.scheme) {
      case "file":
        return fromFilesystem(uri);

      default:
        throw new Error("unknown uri scheme: " + uri.toString());
    }
  } catch (error) {
    logger.recordError(error, uri.toString());
  }
  return undefined;
}

function fromFilesystem(uri: URI): string | undefined {
  const path = uri.fsPath;
  if (fs.existsSync(path)) {
    return fs.readFileSync(path, "utf8");
  }

  return undefined;
}
