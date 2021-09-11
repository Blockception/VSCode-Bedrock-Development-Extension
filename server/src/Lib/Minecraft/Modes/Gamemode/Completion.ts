import { Modes } from "bc-minecraft-bedrock-types";
import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import { CompletionBuilder } from "../../../Completion/include";
import { Kinds } from "../../General/include";
import { ProvideModeCompletion, ProvideModeTestCompletion } from "../Completion";

/**
 *
 * @param Context
 */
export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(Modes.Gamemode, Context.receiver, CompletionItemKind.Operator);
}

export function ProvideCompletionTest(Context: CommandCompletionContext | CompletionBuilder): void {
  let receiver: CompletionBuilder;
  if (CommandCompletionContext.is(Context)) receiver = Context.receiver;
  else receiver = Context;

  ProvideModeTestCompletion(Modes.Gamemode, receiver, Kinds.Completion.Gamemode);
}
