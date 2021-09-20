import { CompletionItemKind } from "vscode-languageserver";
import { CommandCompletionContext } from "../../../Completion/Context";
import { CompletionBuilder } from "../../../Completion/include";

export function ProvideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;
  const Options = context.parameter.options;

  const minimum = Options?.minimum ?? 0;
  const maximum = Options?.maximum ?? 10;

  ProvideCreateCompletion(receiver, minimum, maximum);
}

export function ProvideCreateCompletion(context: CommandCompletionContext | CompletionBuilder, minimum: number, maximum: number): void {
  const receiver: CompletionBuilder = CommandCompletionContext.is(context) ? context.receiver : context;

  const diff = maximum - minimum;
  const steps = diff / 10;

  for (let I = minimum; I < maximum; I += steps) {
    let text = I.toPrecision();
    receiver.Add(text, "The float number: " + text, CompletionItemKind.Constant);
  }
}
