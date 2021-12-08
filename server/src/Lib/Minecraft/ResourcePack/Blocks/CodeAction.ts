import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../CodeAction/Builder";
import { Definition } from "../../../CodeAction/Types/Definition";
import { Commands } from '../../../Constants';

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.block.missing":
    case "resourcepack.block.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create rp block: '${id}'`, Commands.Create.Resourcepack.Blocks, [id]);
      return Definition(builder, diag, "block");
  }
}
