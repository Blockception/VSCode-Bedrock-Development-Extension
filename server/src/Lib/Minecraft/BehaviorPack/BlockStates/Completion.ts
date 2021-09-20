import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Context";

export function ProvideCompletion(context: CommandCompletionContext): void {
  context.receiver.Add("[]", "Block states", CompletionItemKind.Snippet);

  //TODO when in blockstate:
  //context.receiver.GenerateStr(MinecraftData.General.Blocks.blockstates, generateDoc, Kinds.Completion.Event);
}
