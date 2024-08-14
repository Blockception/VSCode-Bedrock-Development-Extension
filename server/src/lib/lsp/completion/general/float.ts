import { CompletionItemKind } from "vscode-languageserver";
import { Context } from "../../context/context";
import { CompletionBuilder } from "../builder/builder";
import { CommandCompletionContext } from "../context";

export function provideCompletion(context: Context<CommandCompletionContext>): void {
  const builder = context.builder;
  const options = context.parameter.options;

  provideCreateCompletion(builder, options?.minimum, options?.maximum);
}

export function provideCreateCompletion(
  context: CommandCompletionContext | CompletionBuilder,
  minimum?: number,
  maximum?: number
): void {
  minimum = minimum ?? 0;
  maximum = maximum ?? 10;

  const receiver: CompletionBuilder = CommandCompletionContext.is(context) ? context.builder : context;

  const diff = maximum - minimum;
  const steps = diff / 10;

  for (let I = minimum; I < maximum; I += steps) {
    let text = I.toPrecision(3);
    receiver.add({ label: text, documentation: "The float number: " + text, kind: CompletionItemKind.Constant });
  }
}
