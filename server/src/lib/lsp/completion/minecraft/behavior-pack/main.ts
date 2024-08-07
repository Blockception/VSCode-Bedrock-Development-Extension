import { FileType } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/BehaviorPack";
import { JsonCompletionContext } from "../../builder/context";

import * as AnimationControllers from "./animation-controllers";
import * as Animations from "./animations";
import * as Blocks from "./blocks";
import * as Entities from "./entity/main";
import * as LootTables from "./loot-tables";
import * as Trading from "./trading";

export function provideJsonCompletion(context: JsonCompletionContext) {
  switch (FileType.detect(context.doc.uri)) {
    case FileType.animation:
      return Animations.provideJsonCompletion(context);
    case FileType.animation_controller:
      return AnimationControllers.provideJsonCompletion(context);
    case FileType.block:
      return Blocks.provideJsonCompletion(context);
    case FileType.entity:
      return Entities.provideJsonCompletion(context);
    case FileType.function:
      return;
    case FileType.item:
      return;
    case FileType.loot_table:
      return LootTables.provideJsonCompletion(context);
    case FileType.manifest:
      return;
    case FileType.script:
      return;
    case FileType.spawn_rule:
      return;
    case FileType.structure:
      return;
    case FileType.trading:
      return Trading.provideCompletion(context);
    case FileType.unknown:
      return;
  }
}
