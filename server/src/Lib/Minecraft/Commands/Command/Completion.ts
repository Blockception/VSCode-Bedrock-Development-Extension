import { CommandData, CommandInfo } from "bc-minecraft-bedrock-command";
import { CompletionBuilder } from "../../../Completion/Builder";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../General/Kinds";
import { SMap } from "bc-minecraft-bedrock-project";
import { SimpleContext } from "../../../Code";

/**
 *
 * @param receiver
 */
export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const edu = IsEducationEnabled(context.doc);

  SMap.forEach(CommandData.Vanilla, (data) => getCompletion(data, context.receiver));
  if (edu) SMap.forEach(CommandData.Edu, (data) => getCompletion(data, context.receiver));
}

export function provideExecuteSubcommandCompletion(context: SimpleContext<CompletionBuilder>): void {
  SMap.forEach(CommandData.ExecuteSubcommands, (data) => getCompletion(data, context.receiver));
}

/**
 *
 * @param Data
 * @param receiver
 */
function getCompletion(Data: CommandInfo[], receiver: CompletionBuilder) {
  for (var I = 0; I < Data.length; I++) {
    const CInfo = Data[I];
    if (CInfo.obsolete) continue;

    const doc = `## ${CInfo.name}\n${CInfo.documentation}\n[documentation](https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/${CInfo.name})`;

    receiver.Add(CInfo.name, doc, Kinds.Completion.Command);
    break;
  }
}
