import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../../../util";
import { CompletionBuilder } from "../../builder/builder";
import {
  cRawTextComponent,
  cRawTextExample,
  cScoreComponent,
  cSelectorComponent,
  cTextComponent,
  cTranslationComponent,
  cTranslationWith,
  cTranslationWithComplex,
} from "../../../../minecraft/json/raw-text/constants";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const builder = context.builder.withDefaults({ kind: CompletionItemKind.Snippet });

  builder.add({ label: "Json Raw Text", documentation: cRawTextComponent, insertText: cRawTextComponent });
  builder.add({ label: "Json Raw Text example", documentation: cRawTextExample, insertText: cRawTextExample });
  builder.add({
    label: "Translation component",
    documentation: cTranslationComponent,
    insertText: cTranslationComponent,
  });
  builder.add({ label: "Translation component, with", documentation: cTranslationWith, insertText: cTranslationWith });
  builder.add({
    label: "Translation component, with complex",
    documentation: cTranslationWithComplex,
    insertText: cTranslationWithComplex,
  });
  builder.add({ label: "Text component", documentation: cTextComponent, insertText: cTextComponent });
  builder.add({ label: "Score component", documentation: cScoreComponent, insertText: cScoreComponent });
  builder.add({ label: "Selector component", documentation: cSelectorComponent, insertText: cSelectorComponent });
}
