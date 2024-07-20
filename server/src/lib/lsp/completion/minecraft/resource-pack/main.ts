import { JsonCompletionContext } from "../../builder/context";
import { FileType } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/ResourcePack";
import { santizeValue as santizeValue } from "../../../../minecraft/json/types";

import * as AnimationControllers from "./animation-controllers";
import * as Animations from "./animations";
import * as Attachables from "./attachables";
import * as BlockCulling from "./block-culling";
import * as Entities from "./entities";
import * as RenderController from "./render-controllers";
import * as Sound from "./sounds";
import * as SoundDefinitions from "./sound-definitions";
import * as Textures from "./textures";
import * as TexturesAtlas from "./texture-atlas";

export function provideJsonCompletion(context: JsonCompletionContext) {
  //Prepare data to be fixed for json
  const data = context.  currentText;

  if (data.startsWith("textures/")) Textures.provideCompletion(context);
  if (data.startsWith("sounds/")) Sound.provideCompletion(context);

  checkFiles({
    ...context,
    builder: context.builder.withEvents((item) => {
      item.insertText = item.insertText ?? item.label;
      item.insertText = santizeValue(item.insertText);
    }),
  });
}

function checkFiles(context: JsonCompletionContext): void {
  switch (FileType.detect(context.doc.uri)) {
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
    case FileType.render_controller:
      return RenderController.provideJsonCompletion(context);
    case FileType.sounds_definitions:
      return SoundDefinitions.provideJsonCompletion(context);

    case FileType.texture_flipbook_atlas:
    case FileType.texture_item_atlas:
    case FileType.texture_terrain_atlas:
      return TexturesAtlas.provideJsonCompletion(context);

    case FileType.biomes_client:
    case FileType.block:
    case FileType.fog:
    case FileType.item:
    case FileType.manifest:
    case FileType.material:
    case FileType.model:
    case FileType.music_definitions:
    case FileType.particle:
    case FileType.sounds:
    case FileType.texture:
    case FileType.unknown:
      break;
  }
}
