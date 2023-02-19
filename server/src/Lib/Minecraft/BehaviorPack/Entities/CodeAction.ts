import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../CodeAction/Builder";
import { Definition } from "../../../CodeAction/Types/Definition";
import { Commands } from '../../../../../../shared/src';

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.entity.missing":
    case "behaviorpack.entity.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create rp & bp entity: '${id}'`, Commands.Create.General.Entity, [id]);
      builder.Command(`Create bp entity: '${id}'`, Commands.Create.Behaviorpack.Entity, [id]);
      return Definition(builder, diag, "entity");
  }
}
