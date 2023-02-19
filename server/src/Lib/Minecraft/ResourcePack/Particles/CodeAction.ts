import { Diagnostic } from "vscode-languageserver";
import { Commands } from "@blockception/shared";
import { CodeActionBuilder } from "../../../CodeAction/Builder";

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "resourcepack.particle.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create rp particle: '${id}'`, Commands.Create.Resourcepack.Particle, [id]);
      return;
  }
}
