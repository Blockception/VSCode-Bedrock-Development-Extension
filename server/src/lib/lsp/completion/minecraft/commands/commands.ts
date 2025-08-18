import { CommandData, CommandInfo } from "bc-minecraft-bedrock-command";
import { Kinds } from "../../../../constants";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Context } from "../../../context/context";
import { CompletionBuilder } from "../../builder/builder";
import { CompletionContext } from "../../context";

/**
 *
 * @param receiver
 */
export function provideCompletion(context: Context<CompletionContext>): void {
  const edu = IsEducationEnabled(context.document);

  Object.values(CommandData.Vanilla).forEach((data) => getCompletion(data, context.builder));
  if (edu) Object.values(CommandData.Edu).forEach((data) => getCompletion(data, context.builder));
}

export function provideExecuteSubcommandCompletion(context: Context<CompletionContext>): void {
  Object.values(CommandData.ExecuteSubcommands).forEach((data) => getCompletion(data, context.builder));
}

/**
 *
 * @param Data
 * @param receiver
 */
function getCompletion(Data: CommandInfo[], receiver: CompletionBuilder) {
  for (let I = 0; I < Data.length; I++) {
    const CInfo = Data[I];
    if (CInfo.obsolete) continue;

    const doc = `## ${CInfo.name}\n${CInfo.documentation}\n[documentation](https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/${CInfo.name})`;

    receiver.add({ label: CInfo.name, documentation: doc, kind: Kinds.Completion.Command });
    break;
  }
}
