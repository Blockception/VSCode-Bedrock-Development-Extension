import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../builder/builder";
import { CommandCompletionContext } from "../builder/context";

export function provideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;
  const options = context.parameter.options;

  provideCreateCompletion(receiver, options?.minimum, options?.maximum);
}

export function provideRangeCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;
  const Options = context.parameter.options;

  const minimum = Options?.minimum ?? 0;
  const maximum = Options?.maximum ?? 10;

  let diff = maximum - minimum;
  let steps = diff > 10 ? diff / 10 : 1;

  if (steps < 1) steps = 1;

  receiver.add({ label:`..${minimum}`, documentation: "", kind: CompletionItemKind.Constant});
  receiver.add({ label:`${maximum}..`, documentation: "", kind: CompletionItemKind.Constant});

  for (let I = minimum; I <= maximum; I += steps) {
    receiver.add({ label:`${I}..${I + steps}`, documentation: "", kind: CompletionItemKind.Constant});
  }
}

export function provideCreateCompletion(receiver: CompletionBuilder, minimum?: number, maximum?: number): void {
  minimum = minimum ?? 0;
  maximum = maximum ?? 10;

  let diff = maximum - minimum;
  let steps = diff > 10 ? diff / 10 : 1;

  if (steps < 1) steps = 1;

  for (let I = minimum; I < maximum; I += steps) {
    receiver.add({ label:I.toString(), documentation: "The integer number: " + I.toString(), kind: CompletionItemKind.Constant});
  }
}
