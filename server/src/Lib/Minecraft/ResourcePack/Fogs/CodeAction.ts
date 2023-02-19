import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../CodeAction/Builder";
import { Definition } from "../../../CodeAction/Types/Definition";
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
