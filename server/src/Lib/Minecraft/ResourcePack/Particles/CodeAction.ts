import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../CodeAction/Builder";
import { Definition } from "../../../CodeAction/Types/Definition";
import { Commands } from '../../../Constants';

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "resourcepack.particle.missing":
      const id = builder.getText(diag.range);
      builder.Command(`Create rp particle: '${id}'`, Commands.Create.Resourcepack.Particle, [id]);
      return;
  }
}
