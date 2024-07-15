import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../code-action/builder";
import { Definition } from "../../../code-action/types/Definition";
import { Commands } from "@blockception/shared";

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.fog.missing":
    case "resourcepack.fog.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create rp fog: '${id}'`, Commands.Create.Resourcepack.Fog, [id]);
      return Definition(builder, diag, "fog");
  }
}
