import { Commands } from "@blockception/shared";
import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "resourcepack.render_controller.missing":
      const id = builder.getId(diag.range);
      builder.command(`Create rp render_controller: '${id}'`, Commands.Create.Resourcepack.Render_Controller, [id]);
      return;
  }
}
