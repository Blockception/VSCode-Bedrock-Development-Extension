import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { Definition } from "../../types/Definition";
import { Commands } from "@blockception/shared";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.entity.missing":
    case "resourcepack.entity.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create rp & bp entity: '${id}'`, Commands.Create.General.Entity, [id]);
      builder.Command(`Create rp entity: '${id}'`, Commands.Create.Resourcepack.Entity, [id]);
      return Definition(builder, diag, "entity");
  }
}
