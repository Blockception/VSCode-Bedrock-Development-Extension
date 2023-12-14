import { CompletionItemKind } from "vscode-languageserver";
import { CommandCompletionContext } from "../../../Completion/Context";
import { CompletionBuilder } from "../../../Completion/Builder";

export function provideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;
  const Options = context.parameter.options;

  const minimum = Options?.minimum ?? 0;
  const maximum = Options?.maximum ?? 10;

  provideCreateCompletion(receiver, minimum, maximum);
}

export function provideCreateCompletion(context: CommandCompletionContext | CompletionBuilder, minimum: number, maximum: number): void {
  const receiver: CompletionBuilder = CommandCompletionContext.is(context) ? context.receiver : context;

  const diff = maximum - minimum;
  const steps = diff / 10;

  for (let I = minimum; I < maximum; I += steps) {
    let text = I.toPrecision(3);
    receiver.Add(text, "The float number: " + text, CompletionItemKind.Constant);
  }
}
