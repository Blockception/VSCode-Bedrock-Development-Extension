import { ExtensionContext } from "vscode";
import * as Create from "./Create/Create";
import * as Errors from "./Errors/OpenLastest";
import * as Language from "./Language/Activate";

export function Activate(context: ExtensionContext): void {
  Create.Activate(context);
  Errors.Activate(context);
  Language.Activate(context);
}
