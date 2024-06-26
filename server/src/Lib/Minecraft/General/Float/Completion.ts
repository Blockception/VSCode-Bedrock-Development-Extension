import { CompletionItemKind } from "vscode-languageserver";
import { CommandCompletionContext } from "../../../Completion/Context";
import { CompletionBuilder } from "../../../Completion/Builder";

export function provideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;
  const options = context.parameter.options;

  provideCreateCompletion(receiver, options?.minimum, options?.maximum);
}

export function provideCreateCompletion(
  context: CommandCompletionContext | CompletionBuilder,
  minimum?: number,
  maximum?: number
): void {
  minimum = minimum ?? 0;
  maximum = maximum ?? 10;

  const receiver: CompletionBuilder = CommandCompletionContext.is(context) ? context.receiver : context;

  const diff = maximum - minimum;
  const steps = diff / 10;

  for (let I = minimum; I < maximum; I += steps) {
    let text = I.toPrecision(3);
    receiver.Add(text, "The float number: " + text, CompletionItemKind.Constant);
  }
}
