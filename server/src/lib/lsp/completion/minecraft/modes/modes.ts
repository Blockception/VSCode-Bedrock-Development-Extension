import { SimpleContext } from "../../../../util";
import { CompletionBuilder } from "../..";
import { ModeUtil } from "bc-minecraft-bedrock-types";
import { CompletionItemKind } from "vscode-languageserver";
import { ModeHandler } from "bc-minecraft-bedrock-types/lib/src/modes/mode-handler";

const expections: Record<string, (context: SimpleContext<CompletionBuilder>) => void> = {};

/**
 * Provide completion for the given mode
 * @param mode The mode to provide completion for
 * @param context The context to provide completion in
 */
export function provideCompletion(mode: string, context: SimpleContext<CompletionBuilder>): void {
  const func = expections[mode];
  if (func) return func(context);

  return provideModeCompletion(ModeUtil.getMode(mode), context);
}

/**
 * Provide completion for the given mode
 * @param mode The mode to provide completion for
 * @param context The context to provide completion in
 * @param kind The kind of completion item to provide
 */
export function provideModeCompletion(
  mode: ModeHandler | undefined,
  context: SimpleContext<CompletionBuilder>,
  kind: CompletionItemKind = CompletionItemKind.Property
) {
  if (!mode) return;

  mode.foreach((m) => {
    let documentation = m.documentation;

    if (m.eduOnly) {
      documentation += "\nThis mode is only available in Education Edition";
    }

    context.builder.add({ label: m.name, documentation, kind });
  });
}

export function provideModeCompletionTest(
  mode: ModeHandler | undefined,
  context: SimpleContext<CompletionBuilder>,
  kind: CompletionItemKind = CompletionItemKind.Property
) {
  if (!mode) return;

  mode.foreach((m) => {
    let documentation = m.documentation;

    if (m.eduOnly) {
      documentation += "\nThis mode is only available in Education Edition";
    }

    context.builder.add({ label: m.name, documentation, kind });
    context.builder.add({ label: `!${m.name}`, documentation, kind });
  });
}
