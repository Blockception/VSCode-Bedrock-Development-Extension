import { Commands } from "@blockception/shared";
import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "resourcepack.model.missing":
      const id = builder.getId(diag.range);
      builder.command(`Create rp model: '${id}'`, Commands.Create.Resourcepack.Model, [id]);
      return;
  }
}
