import { FileType } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/BehaviorPack";
import { JsonCompletionContext } from "../../Completion/builder/context";
import { SantizeValue } from '../Json/Types';

import * as LootTables from "./LootTables/Completion";
import * as Entities from "./Entities/Completion";
import * as Trading from "./Trading/Completion";

export function provideJsonCompletion(context: JsonCompletionContext) {
  const cancelFn = context.receiver.OnNewItem((item, next) => {
    item.insertText = item.insertText ?? item.label;
    item.insertText = SantizeValue(item.insertText);
    next(item);
  });

  checkFiles(context);
  cancelFn();
}

function checkFiles(context: JsonCompletionContext) {
  switch (FileType.detect(context.doc.uri)) {
    case FileType.animation:
      return;
    case FileType.animation_controller:
      return;
    case FileType.block:
      return;
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
      return ;
    case FileType.unknown:
      return;
  }
}