import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { Definition } from "../../types/Definition";
import { Commands } from "@blockception/shared";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.fog.missing":
    case "resourcepack.fog.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create rp fog: '${id}'`, Commands.Create.Resourcepack.Fog, [id]);
      return Definition(builder, diag, "fog");
  }
}
