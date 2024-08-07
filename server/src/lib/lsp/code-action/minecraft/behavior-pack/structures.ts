import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { definition } from "../../types/definition";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.mcstructure.missing":
    case "behaviorpack.mcstructure.missing":
      return definition(builder, diag, "structure");
  }
}
