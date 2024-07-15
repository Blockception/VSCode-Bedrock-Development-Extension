import { Diagnostic } from "vscode-languageserver";
import { Commands } from "@blockception/shared";
import { CodeActionBuilder } from "../../../code-action/builder";

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "resourcepack.model.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create rp model: '${id}'`, Commands.Create.Resourcepack.Model, [id]);
      return;
  }
}
