import { JsonCompletionContext } from "../../Completion/Context";

import * as LootTables from "./LootTables/Completion";
import * as Trading from "./Trading/Completion";

export function ProvideCompletion(context: JsonCompletionContext) {
  //Prepare data to be fixed for json
  const data = context.currentText;

  if (data.startsWith("loot_tables/")) LootTables.ProvideCompletion(context);
  if (data.startsWith("trading/")) Trading.ProvideCompletion(context);
}
