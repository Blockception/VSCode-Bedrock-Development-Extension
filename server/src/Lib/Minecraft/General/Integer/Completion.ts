import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Context";

export function ProvideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;
  const Options = context.parameter.options;

  const minimum = Options?.minimum ?? 0;
  const maximum = Options?.maximum ?? 10;

  ProvideCreateCompletion(receiver, minimum, maximum);
}

export function ProvideCreateCompletion(receiver: CompletionBuilder, minimum: number, maximum: number): void {
  let diff = maximum - minimum;
  let steps = diff > 10 ? diff / 10 : 1;

  for (let I = minimum; I < maximum; I += steps) {
    receiver.Add(I.toPrecision(), "The integer number: " + I.toString(), CompletionItemKind.Constant);
  }
}
