import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { Definition } from "../../types/definition";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.fakeentity.missing":
      return Definition(builder, diag, "fakeentity");
  }
}
