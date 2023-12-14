import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Context";

export function provideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;
  const Options = context.parameter.options;

  const minimum = Options?.minimum ?? 0;
  const maximum = Options?.maximum ?? 10;

  provideCreateCompletion(receiver, minimum, maximum);
}

export function provideRangeCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;
  const Options = context.parameter.options;

  const minimum = Options?.minimum ?? 0;
  const maximum = Options?.maximum ?? 10;

  let diff = maximum - minimum;
  let steps = diff > 10 ? diff / 10 : 1;

  if (steps < 1) steps = 1;

  receiver.Add(`..${minimum}`, "", CompletionItemKind.Constant);
  receiver.Add(`${maximum}..`, "", CompletionItemKind.Constant);

  for (let I = minimum; I <= maximum; I += steps) {
    receiver.Add(`${I}..${I + steps}`, "", CompletionItemKind.Constant);
  }
}

export function provideCreateCompletion(receiver: CompletionBuilder, minimum: number, maximum: number): void {
  let diff = maximum - minimum;
  let steps = diff > 10 ? diff / 10 : 1;

  if (steps < 1) steps = 1;

  for (let I = minimum; I < maximum; I += steps) {
    receiver.Add(I.toString(), "The integer number: " + I.toString(), CompletionItemKind.Constant);
  }
}
