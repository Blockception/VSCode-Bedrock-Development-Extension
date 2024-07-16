import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { Definition } from "../../types/Definition";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.objective.missing":
      return Definition(builder, diag, "objective");
  }
}
