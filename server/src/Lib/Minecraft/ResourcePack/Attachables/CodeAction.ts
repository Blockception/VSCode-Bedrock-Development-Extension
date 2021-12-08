import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../CodeAction/Builder";
import { Definition } from "../../../CodeAction/Types/Definition";
import { Commands } from '../../../Constants';

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.attachable.missing":
    case "resourcepack.attachable.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create rp attachable: '${id}'`, Commands.Create.Resourcepack.Attachable, [id]);
      return Definition(builder, diag, "attachable");
  }
}
