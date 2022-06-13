import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../CodeAction/Builder";
import { Commands } from '../../../Constants';


export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.block.missing":
    case "behaviorpack.block.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create bp block: '${id}'`, Commands.Create.Behaviorpack.Block, [id]);
      return;
  }
}
