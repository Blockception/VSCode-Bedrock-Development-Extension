import { Commands } from "@blockception/shared";
import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "resourcepack.particle.missing":
      const id = builder.getId(diag.range);
      builder.command(`Create rp particle: '${id}'`, Commands.Create.Resourcepack.Particle, [id]);
      return;
  }
}
