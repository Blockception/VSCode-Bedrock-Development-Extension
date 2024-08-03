import { CommandData, CommandInfo } from "bc-minecraft-bedrock-command";
import { CompletionBuilder } from "../../builder/builder";
import { CompletionContext } from "../../context";
import { Context } from "../../../context/context";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants/kinds";
import { SMap } from "bc-minecraft-bedrock-project";

/**
 *
 * @param receiver
 */
export function provideCompletion(context: Context<CompletionContext>): void {
  const edu = IsEducationEnabled(context.document);

  SMap.forEach(CommandData.Vanilla, (data) => getCompletion(data, context.builder));
  if (edu) SMap.forEach(CommandData.Edu, (data) => getCompletion(data, context.builder));
}

export function provideExecuteSubcommandCompletion(context: Context<CompletionContext>): void {
  SMap.forEach(CommandData.ExecuteSubcommands, (data) => getCompletion(data, context.builder));
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

    receiver.add({ label: CInfo.name, documentation: doc, kind: Kinds.Completion.Command });
    break;
  }
}
