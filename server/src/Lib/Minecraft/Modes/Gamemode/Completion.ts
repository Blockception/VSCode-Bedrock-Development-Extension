import { Modes } from "bc-minecraft-bedrock-types";
import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Context";
import { CompletionBuilder } from "../../../Completion/include";
import { Kinds } from "../../General/include";
import { ProvideModeCompletion, ProvideModeTestCompletion } from "../Completion";

/**
 *
 * @param context
 */
export function ProvideCompletion(context: CommandCompletionContext): void {
  ProvideModeCompletion(Modes.Gamemode, context.receiver, CompletionItemKind.Operator);
}

export function ProvideCompletionTest(context: CommandCompletionContext | CompletionBuilder): void {
  let receiver: CompletionBuilder;
  if (CommandCompletionContext.is(context)) receiver = context.receiver;
  else receiver = context;

  ProvideModeTestCompletion(Modes.Gamemode, receiver, Kinds.Completion.Gamemode);
}
