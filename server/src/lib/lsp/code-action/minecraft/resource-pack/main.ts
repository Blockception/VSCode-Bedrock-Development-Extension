import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";

import * as AnimationControllers from "./animation-controllers";
import * as Animations from "./animations";
import * as Attachables from "./attachables";
import * as Blocks from "./blocks";
import * as Entities from "./entities";
import * as Fogs from "./fogs";
import * as Materials from "./materials";
import * as Particles from "./particles";
import * as RenderControllers from "./render-controllers";

/**
 *
 * @param builder
 * @param diag
 */
export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  const code = diag.code ?? "";

  if (typeof code === "number") return;

  const index = code.indexOf(".", 13);
  const subcode = index > -1 ? code.slice(13, index) : code.slice(13);

  switch (subcode) {

    case "animation_controller":
      return AnimationControllers.onCodeAction(builder, diag);
      
    case "animation":
      return Animations.onCodeAction(builder, diag);
      
    case "anim_or_controller":
      AnimationControllers.onCodeAction(builder, diag);
      return Animations.onCodeAction(builder, diag);

    case "attachable":
    case "item":
      return Attachables.onCodeAction(builder, diag);

    case "block":
      return Blocks.onCodeAction(builder, diag);

    case "entity":
      return Entities.onCodeAction(builder, diag);

    case "fog":
      return Fogs.onCodeAction(builder, diag);

    case "material":
      return Materials.onCodeAction(builder, diag);

    case "particle":
      return Particles.onCodeAction(builder, diag);

    case "render_controller":
      return RenderControllers.onCodeAction(builder, diag);
  }
}
