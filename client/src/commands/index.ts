import { ExtensionContext } from "vscode";
import * as Create from "./create-templates";
import * as Errors from "./open-lastest";
import * as Language from "./languages";
import * as ShowVanillaFile from "./show-vanilla-file";
import * as ShowDocs from "./show-docs";

export function activate(context: ExtensionContext): void {
  Create.activate(context);
  Errors.activate(context);
  Language.activate(context);
  ShowVanillaFile.activate(context);
  ShowDocs.activate(context);
}
