import { JsonCompletionContext } from "../../Completion/Context";
import { FileType } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/ResourcePack";

import * as Sound from "../General/Sound/Completion";
import * as Textures from "./Textures/Completion";
import * as Entities from "./Entities/Completion";

export function provideJsonCompletion(context: JsonCompletionContext) {
  //Prepare data to be fixed for json
  const data = context.currentText;

  if (data.startsWith("textures/")) Textures.provideCompletion(context);
  if (data.startsWith("sounds/")) Sound.provideCompletion(context);

  const cancelFn = context.receiver.OnNewItem((item, next) => {
    item.insertText = item.insertText ?? item.label;
    item.insertText = `"${item.insertText}"`;
    next(item);
  });

  checkFiles(context);
  cancelFn();
}

function checkFiles(context: JsonCompletionContext): void {
  switch (FileType.detect(context.doc.uri)) {
    case FileType.animation:
      break;
    case FileType.animation_controller:
      break;
    case FileType.attachable:
      break;
    case FileType.biomes_client:
      break;
    case FileType.block:
      break;
    case FileType.block_culling_rules:
      break;
    case FileType.entity:
      return Entities.provideJsonCompletion(context);
    case FileType.fog:
      break;
    case FileType.item:
      break;
    case FileType.manifest:
      break;
    case FileType.material:
      break;
    case FileType.model:
      break;
    case FileType.music_definitions:
      break;
    case FileType.particle:
      break;
    case FileType.render_controller:
      break;
    case FileType.sounds:
      break;
    case FileType.sounds_definitions:
      break;
    case FileType.texture:
      break;
    case FileType.texture_flipbook_atlas:
      break;
    case FileType.texture_item_atlas:
      break;
    case FileType.texture_terrain_atlas:
      break;
    case FileType.unknown:
      break;
  }
}