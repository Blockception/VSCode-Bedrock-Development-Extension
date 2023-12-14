import { JsonCompletionContext } from "../../Completion/Context";

import * as LootTables from "./LootTables/Completion";
import * as Trading from "./Trading/Completion";

export function provideCompletion(context: JsonCompletionContext) {
  if (context.doc.uri.includes("loot_tables")) return LootTables.provideLootTableCompletion(context);

  //Prepare data to be fixed for json
  const data = context.currentText;

  if (data.startsWith("loot_tables/")) LootTables.provideCompletion(context);
  if (data.startsWith("trading/")) Trading.provideCompletion(context);
}
