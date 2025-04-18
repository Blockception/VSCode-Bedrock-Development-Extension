import { URI } from "vscode-uri";
import { IExtendedLogger } from "../logger/logger";
import { exists } from "../../io/io";

import * as fs from "fs";

/**
 * Tries to read the file from disk
 * @param uri The vscode uri of the document to retrieve
 * @param logger The logger to report error and information to
 * @returns The contents of the file or undefined when an error occured
 */
export function readDocument(uri: URI, logger: IExtendedLogger): string | undefined {
  logger.debug("loading document manually", uri);
  
  try {
    switch (uri.scheme) {
      case "file":
        return fromFilesystem(uri, logger);

      default:
        throw new Error("unknown uri scheme: " + uri.toString());
    }
  } catch (error) {
    logger.recordError(error, uri.toString());
  }
  return undefined;
}

function fromFilesystem(uri: URI, logger: IExtendedLogger): string | undefined {
  const path = uri.fsPath;
  if (exists(path, logger)) {
    const data = fs.readFileSync(path, "utf8");
    return data;
  }

  return undefined;
}
