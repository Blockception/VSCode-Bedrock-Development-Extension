import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../builder/builder";
import { CommandCompletionContext } from "../context";
import { Context } from "../../context/context";

export function provideCompletion(context: Context<CommandCompletionContext>): void {
  const builder = context.builder;
  const options = context.parameter.options;

  provideCreateCompletion(builder, options?.minimum, options?.maximum);
}

export function provideRangeCompletion(context: CommandCompletionContext): void {
  const builder = context.builder.withDefaults({ kind: CompletionItemKind.Constant });
  const options = context.parameter.options;

  const minimum = options?.minimum ?? 0;
  const maximum = options?.maximum ?? 10;

  let diff = maximum - minimum;
  let steps = diff > 10 ? diff / 10 : 1;

  if (steps < 1) steps = 1;

  builder.add({ label: `..${minimum}`, documentation: "" });
  builder.add({ label: `${maximum}..`, documentation: "" });

  for (let I = minimum; I <= maximum; I += steps) {
    builder.add({ label: `${I}..${I + steps}`, documentation: "" });
  }
}

export function provideCreateCompletion(receiver: CompletionBuilder, minimum?: number, maximum?: number): void {
  minimum = minimum ?? 0;
  maximum = maximum ?? 10;

  let diff = maximum - minimum;
  let steps = diff > 10 ? diff / 10 : 1;

  if (steps < 1) steps = 1;

  for (let I = minimum; I < maximum; I += steps) {
    receiver.add({
      label: I.toString(),
      documentation: "The integer number: " + I.toString(),
      kind: CompletionItemKind.Constant,
    });
  }
}
