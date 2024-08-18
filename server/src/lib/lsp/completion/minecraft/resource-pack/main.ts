import { FileType } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/ResourcePack";
import { Context } from "../../../context/context";
import { JsonCompletionContext } from "../../context";

import * as AnimationControllers from "./animation-controllers";
import * as Animations from "./animations";
import * as Attachables from "./attachables";
import * as BlockCulling from "./block-culling";
import * as Entities from "./entities";
import * as RenderController from "./render-controllers";
import * as SoundDefinitions from "./sound-definitions";
import * as Sound from "./sounds";
import * as TexturesAtlas from "./texture-atlas";
import * as Textures from "./textures";
import * as Manifests from "../../general/manifests";

export function provideJsonCompletion(context: Context<JsonCompletionContext>) {
  //Prepare data to be fixed for json
  const data = context.currentText;

  if (data.startsWith("textures/")) Textures.provideCompletion(context);
  if (data.startsWith("sounds/")) Sound.provideCompletion(context);

  switch (FileType.detect(context.document.uri)) {
    case FileType.animation:
      return Animations.provideJsonCompletion(context);
    case FileType.animation_controller:
      return AnimationControllers.provideJsonCompletion(context);
    case FileType.attachable:
      return Attachables.provideJsonCompletion(context);
    case FileType.block_culling_rules:
      return BlockCulling.provideJsonCompletion(context);
    case FileType.entity:
      return Entities.provideJsonCompletion(context);
    case FileType.manifest:
      return Manifests.provideJsonCompletion(context);
    case FileType.render_controller:
      return RenderController.provideJsonCompletion(context);
    case FileType.sounds_definitions:
      return SoundDefinitions.provideJsonCompletion(context);

    case FileType.texture_flipbook_atlas:
    case FileType.texture_item_atlas:
    case FileType.texture_terrain_atlas:
      return TexturesAtlas.provideJsonCompletion(context);

    // case FileType.biomes_client:
    // case FileType.block:
    // case FileType.fog:
    // case FileType.item:
    // case FileType.material:
    // case FileType.model:
    // case FileType.music_definitions:
    // case FileType.particle:
    // case FileType.sounds:
    // case FileType.texture:
    // case FileType.unknown:
    default:
      break;
  }
}
