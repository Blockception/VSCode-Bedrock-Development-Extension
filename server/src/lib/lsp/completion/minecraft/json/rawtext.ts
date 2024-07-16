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
  const receiver = context.receiver;

  receiver.add({label:"Json Raw Text", documentation: cRawTextComponent, kind: CompletionItemKind.Snippet, insertText: cRawTextComponent});
  receiver.add({label:"Json Raw Text example", documentation: cRawTextExample, kind: CompletionItemKind.Snippet, insertText: cRawTextExample});
  receiver.add({label:"Translation component", documentation: cTranslationComponent, kind: CompletionItemKind.Snippet, insertText: cTranslationComponent});
  receiver.add({label:"Translation component, with", documentation: cTranslationWith, kind: CompletionItemKind.Snippet, insertText: cTranslationWith});
  receiver.add({label:"Translation component, with complex", documentation: cTranslationWithComplex, kind: CompletionItemKind.Snippet, insertText: cTranslationWithComplex});
  receiver.add({label:"Text component", documentation: cTextComponent, kind: CompletionItemKind.Snippet, insertText: cTextComponent});
  receiver.add({label:"Score component", documentation: cScoreComponent, kind: CompletionItemKind.Snippet, insertText: cScoreComponent});
  receiver.add({label:"Selector component", documentation: cSelectorComponent, kind: CompletionItemKind.Snippet, insertText: cSelectorComponent});
}
