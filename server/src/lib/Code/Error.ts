import { Console } from "../Manager/Console";
import { GetFilename } from "./File";

export function HandleError(error: any, doc: { uri: string } | string | undefined = undefined): void {
  let msg: string;

  if (errormsg.is(error)) {
    msg = `message: ${error.message}\n\tstack:${error.stack}`;
  } else {
    msg = JSON.stringify(error);
  }

  if (doc) {
    msg = GetFilename(typeof doc === "object" ? doc.uri : doc) + " | " + msg;
  }

  Console.Error(msg);
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
