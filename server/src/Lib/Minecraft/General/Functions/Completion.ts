import { BehaviorPack } from "bc-minecraft-bedrock-project";
import { GetFilename } from "../../../Code/File";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(context: CommandCompletionContext): void {
  context.receiver.AddFromRange(Database.ProjectData.BehaviorPacks.functions, generateDocumentation, Kinds.Completion.Functions);
}

function generateDocumentation(item: BehaviorPack.McFunction.Function): string {
  const filename = GetFilename(item.location.uri);

  return `The mcfunction: ${item.id}\nLocation: ${filename}`;
}
