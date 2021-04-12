import { CompletionItemKind } from "vscode-languageserver";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { CompletionBuilder } from "../../../Completion/include";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let receiver = Context.receiver;
  let Options = Context.Parameter.Options;

  const minimum = Options?.minimum ?? 0;
  const maximum = Options?.maximum ?? 10;

  ProvideCreateCompletion(receiver, minimum, maximum);
}

export function ProvideCreateCompletion(Context: CommandCompletionContext | CompletionBuilder, minimum: number, maximum: number): void {
  let receiver: CompletionBuilder;
  if (CommandCompletionContext.is(Context)) receiver = Context.receiver;
  else receiver = Context;

  let diff = maximum - minimum;
  let steps = diff / 10;

  for (let I = minimum; I < maximum; I += steps) {
    let text = I.toPrecision();
    receiver.Add(text, "The float number: " + text, CompletionItemKind.Constant);
  }
}
