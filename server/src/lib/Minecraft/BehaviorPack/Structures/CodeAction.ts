import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../CodeAction/Builder";
import { Definition } from "../../../CodeAction/Types/Definition";

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.mcstructure.missing":
    case "behaviorpack.mcstructure.missing":
      return Definition(builder, diag, "structure");
  }
}
