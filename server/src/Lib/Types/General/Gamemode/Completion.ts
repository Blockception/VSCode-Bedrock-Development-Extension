import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import { ProvideModeCompletion, ProvideModeTestCompletion } from "../../Commands/Modes/Completion";
import { Kinds } from "../Kinds";
import { GameMode } from "./Mode";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let receiver = Context.receiver;
  ProvideModeCompletion(GameMode, receiver, Kinds.Completion.Gamemode);
}

export function ProvideCompletionTest(Context: CommandCompletionContext | CompletionBuilder): void {
  let receiver: CompletionBuilder;
  if (CommandCompletionContext.is(Context)) receiver = Context.receiver;
  else receiver = Context;

  ProvideModeTestCompletion(GameMode, receiver, Kinds.Completion.Gamemode);
}
