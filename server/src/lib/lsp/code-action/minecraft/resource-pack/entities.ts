import { Commands } from "@blockception/shared";
import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { definition } from "../../types/definition";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.entity.missing":
    case "resourcepack.entity.missing":
      const id = builder.getId(diag.range);
      builder.command(`Create rp & bp entity: '${id}'`, Commands.Create.General.Entity, [id]);
      builder.command(`Create rp entity: '${id}'`, Commands.Create.Resourcepack.Entity, [id]);
      return definition(builder, diag, "entity");
  }
}
