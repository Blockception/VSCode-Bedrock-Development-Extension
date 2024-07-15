import { JsonCompletionContext } from "../../builder/context";
import { FileType } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/ResourcePack";
import { santizeValue as santizeValue } from "../../../Minecraft/Json/Types";

import * as AnimationControllers from "./animation-controllers";
import * as Animations from "./animations";
import * as Attachables from "./attachables";
import * as BlockCulling from "./block-culling";
import * as Entities from "./entities";
import * as Sound from "./sounds";
import * as Textures from "./textures";

export function provideJsonCompletion(context: JsonCompletionContext) {
  //Prepare data to be fixed for json
  const data = context.currentText;

  if (data.startsWith("textures/")) Textures.provideCompletion(context);
  if (data.startsWith("sounds/")) Sound.provideCompletion(context);

  checkFiles({
    ...context,
    receiver: context.receiver.withEvents((item) => {
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
    case FileType.biomes_client:
    case FileType.block:
      break;
    case FileType.block_culling_rules:
      return BlockCulling.provideJsonCompletion(context);
    case FileType.entity:
      return Entities.provideJsonCompletion(context);
    case FileType.fog:
    case FileType.item:
    case FileType.manifest:
    case FileType.material:
    case FileType.model:
    case FileType.music_definitions:
    case FileType.particle:
    case FileType.render_controller:
    case FileType.sounds:
    case FileType.sounds_definitions:
    case FileType.texture:
    case FileType.texture_flipbook_atlas:
    case FileType.texture_item_atlas:
    case FileType.texture_terrain_atlas:
    case FileType.unknown:
      break;
  }
}
