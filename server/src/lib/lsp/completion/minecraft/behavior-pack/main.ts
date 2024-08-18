import { FileType } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/BehaviorPack";
import { Context } from "../../../context/context";
import { JsonCompletionContext } from "../../context";

import * as AnimationControllers from "./animation-controllers";
import * as Animations from "./animations";
import * as Blocks from "./blocks";
import * as Entities from "./entity/main";
import * as LootTables from "./loot-tables";
import * as Trading from "./trading";
import * as Manifests from "../../general/manifests";

export function provideJsonCompletion(context: Context<JsonCompletionContext>) {
  switch (FileType.detect(context.document.uri)) {
    case FileType.animation:
      return Animations.provideJsonCompletion(context);
    case FileType.animation_controller:
      return AnimationControllers.provideJsonCompletion(context);
    case FileType.block:
      return Blocks.provideJsonCompletion(context);
    case FileType.entity:
      return Entities.provideJsonCompletion(context);
    case FileType.loot_table:
      return LootTables.provideJsonCompletion(context);
    case FileType.manifest:
      return Manifests.provideJsonCompletion(context);
    case FileType.trading:
      return Trading.provideCompletion(context);

    // case FileType.function:
    // case FileType.item:
    // case FileType.script:
    // case FileType.spawn_rule:
    // case FileType.structure:
    // case FileType.unknown:
    default:
      return;
  }
}
