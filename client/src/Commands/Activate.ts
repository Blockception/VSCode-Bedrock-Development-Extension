import { ExtensionContext } from "vscode";
import * as CheatSeet from "./CheatSheet/CheatSeet";
import * as Create from "./Create/Create";
import * as Errors from "./Errors/OpenLastest";
import * as Language from "./Language/Activate";

export function Activate(context: ExtensionContext): void {
  CheatSeet.Activate(context);
  Create.Activate(context);
  Errors.Activate(context);
  Language.Activate(context);
}
