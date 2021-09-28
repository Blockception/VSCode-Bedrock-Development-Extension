import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../CodeAction/Builder";

import * as AnimationControllers from "./AnimationControllers/include";
import * as Animations from "./Animations/include";
import * as Attachables from "./Attachables/include";
import * as Blocks from "./Blocks/include";
import * as Entities from "./Entities/include";
import * as Fogs from "./Fogs/include";
import * as Materials from "./Materials/include";
import * as Particles from "./Particles/include";
import * as RenderControllers from "./RenderControllers/include";

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
