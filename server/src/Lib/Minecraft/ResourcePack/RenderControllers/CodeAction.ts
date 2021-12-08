import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../CodeAction/Builder";
import { Definition } from "../../../CodeAction/Types/Definition";
import { Commands } from '../../../Constants';

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "resourcepack.render_controller.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create rp render_controller: '${id}'`, Commands.Create.Resourcepack.Render_Controller, [id]);
      return;
  }
}
