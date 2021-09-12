import { BehaviorPack } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/include";
import { CompletionItemKind } from "vscode-languageserver";
import { GetFilename } from "../../../Code/include";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Database } from "../../../Database/include";

/**
 *
 * @param context
 */
export function ProvideCompletion(context: CommandCompletionContext): void {
  context.receiver.AddFromRange(Database.ProjectData.BehaviorPacks.items, generateDocumentation, CompletionItemKind.Struct);
}

function generateDocumentation(item: BehaviorPack.Item.Item): string {
  const filename = GetFilename(item.location.uri);

  return `The mcfunction: ${item.id}\nLocation: ${filename}`;
}
