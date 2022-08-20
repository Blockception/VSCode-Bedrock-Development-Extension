import { CommandData, CommandInfo } from 'bc-minecraft-bedrock-command';
import { CompletionBuilder } from "../../../Completion/Builder";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../General/Kinds";
import { Map } from "bc-minecraft-bedrock-project";
import { SimpleContext } from "../../../Code/index";

/**
 *
 * @param receiver
 */
export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const edu = IsEducationEnabled(context.doc);

  Map.forEach(CommandData.Vanilla, (data) => GetCompletion(data, context.receiver));
  if (edu) Map.forEach(CommandData.Edu, (data) => GetCompletion(data, context.receiver));
}

/**
 *
 * @param Datas
 * @param receiver
 */
function GetCompletion(Data: CommandInfo[], receiver: CompletionBuilder) {
  for (var I = 0; I < Data.length; I++) {
    const CInfo = Data[I];

    receiver.Add(CInfo.name, CInfo.documentation, Kinds.Completion.Command);
    break;
  }
}
