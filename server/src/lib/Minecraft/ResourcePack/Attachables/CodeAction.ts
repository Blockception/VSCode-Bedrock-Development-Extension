import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../code-action/builder";
import { Definition } from "../../../code-action/types/Definition";
import { Commands } from "@blockception/shared";

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.attachable.missing":
    case "resourcepack.attachable.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create rp attachable: '${id}'`, Commands.Create.Resourcepack.Attachable, [id]);
      return Definition(builder, diag, "attachable");
  }
}
