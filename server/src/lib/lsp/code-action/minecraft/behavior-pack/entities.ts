import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { definition } from "../../types/definition";
import { Commands } from "@blockception/shared";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.entity.missing":
    case "behaviorpack.entity.missing":
      const id = builder.getId(diag.range);
      builder.command(`Create rp & bp entity: '${id}'`, Commands.Create.General.Entity, [id]);
      builder.command(`Create bp entity: '${id}'`, Commands.Create.Behaviorpack.Entity, [id]);
      return definition(builder, diag, "entity");
  }
}
