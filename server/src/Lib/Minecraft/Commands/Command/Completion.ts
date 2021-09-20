import { Data } from "bc-minecraft-bedrock-command";
import { CommandInfo } from "bc-minecraft-bedrock-command/lib/src/Lib/Data/include";
import { Map } from "bc-minecraft-bedrock-project";
import { SimpleContext } from "../../../Code/include";
import { CompletionBuilder } from "../../../Completion/include";
import { IsEducationEnabled } from "../../../Project/include";
import { Kinds } from "../../General/Kinds";

/**
 *
 * @param receiver
 */
export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const edu = IsEducationEnabled(context.doc);

  Map.forEach(Data.Vanilla, (data) => GetCompletion(data, context.receiver));
  if (edu) Map.forEach(Data.Edu, (data) => GetCompletion(data, context.receiver));
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
