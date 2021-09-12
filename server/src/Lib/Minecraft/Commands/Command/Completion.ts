import { CommandInfo } from "bc-minecraft-bedrock-command/lib/src/Lib/Data/include";
import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../../Completion/include";
import { IsEducationEnabled } from "../../../Project/include";

/**
 *
 * @param receiver
 */
export function ProvideCompletion(receiver: CompletionBuilder): void {
  const edu = IsEducationEnabled(receiver.doc);

  //TODO redo

  /**GetCompletion(Manager.Data.Vanilla.Commands.Subset, receiver);
  if (edu) GetCompletion(Manager.Data.Edu.Commands.Subset, receiver);**/
}

/**
 *
 * @param Datas
 * @param receiver
 */
function GetCompletion(Data: Map<string, CommandInfo[]>, receiver: CompletionBuilder) {
  for (let [key, value] of Data) {
    let documentation: string = "The command: " + key;

    const Limit = value.length;

    if (Limit > 7) {
      documentation += "\n- " + value[0].documentation;
    } else {
      for (let I = 0; I < Limit; I++) {
        const Line = "\n- " + value[I].documentation;

        if (!documentation.includes(Line)) documentation += Line;
      }
    }

    receiver.Add(key, documentation, CompletionItemKind.Class);
  }
}
