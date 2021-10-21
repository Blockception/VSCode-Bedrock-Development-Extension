import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../CodeAction/Builder";

import * as AnimationControllers from "./AnimationControllers/CodeAction";
import * as Animations from "./Animations/CodeAction";
import * as Attachables from "./Attachables/CodeAction";
import * as Blocks from "./Blocks/CodeAction";
import * as Entities from "./Entities/CodeAction";
import * as Fogs from "./Fogs/CodeAction";
import * as Materials from "./Materials/CodeAction";
import * as Particles from "./Particles/CodeAction";
import * as RenderControllers from "./RenderControllers/CodeAction";

/**
 *
 * @param builder
 * @param diag
 */
export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  let code = diag.code ?? "";

  if (typeof code === "number") return;

  const index = code.indexOf(".", 13);
  const subcode = index > -1 ? code.slice(13, index) : code.slice(13);

  switch (subcode) {

    case "animation_controller":
      return AnimationControllers.OnCodeAction(builder, diag);
      
    case "animation":
      return Animations.OnCodeAction(builder, diag);
      
    case "anim_or_controller":
      AnimationControllers.OnCodeAction(builder, diag);
      return Animations.OnCodeAction(builder, diag);

    case "attachable":
    case "item":
      return Attachables.OnCodeAction(builder, diag);

    case "block":
      return Blocks.OnCodeAction(builder, diag);

    case "entity":
      return Entities.OnCodeAction(builder, diag);

    case "fog":
      return Fogs.OnCodeAction(builder, diag);

    case "material":
      return Materials.OnCodeAction(builder, diag);

    case "particle":
      return Particles.OnCodeAction(builder, diag);

    case "render_controller":
      return RenderControllers.OnCodeAction(builder, diag);
  }
}
