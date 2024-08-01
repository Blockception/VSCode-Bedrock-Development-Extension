import { IExtendedLogger } from '../lsp/logger/logger';
import { Manager } from '../manager';
import { getFilename } from "./file";

export function HandleError(error: any, logger?: IExtendedLogger, doc: { uri: string } | string | undefined = undefined): void {
  let msg: string;

  if (errormsg.is(error)) {
    msg = `message: ${error.message}\n\tstack:${error.stack}`;
  } else {
    msg = JSON.stringify(error);
  }

  if (doc) {
    msg = getFilename(typeof doc === "object" ? doc.uri : doc) + " | " + msg;
  }

  if (logger !== undefined) {
    logger.error(msg);
  } else {
    Manager.Connection.console.error(msg);
  }
}

interface errormsg {
  message: string;
  stack: string;
}

namespace errormsg {
  export function is(value: any): value is errormsg {
    if (typeof value === "object") {
      if (typeof value.message === "string" && typeof value.stack === "string") return true;
    }

    return false;
  }
}
