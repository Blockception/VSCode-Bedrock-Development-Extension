import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../../Code";
import { CompletionBuilder } from "../../../Completion/Builder";
import {
  cRawTextComponent,
  cRawTextExample,
  cScoreComponent,
  cSelectorComponent,
  cTextComponent,
  cTranslationComponent,
  cTranslationWith,
  cTranslationWithComplex,
} from "./Constants";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const receiver = context.receiver;

  receiver.Add("Json Raw Text", cRawTextComponent, CompletionItemKind.Snippet, cRawTextComponent);
  receiver.Add("Json Raw Text example", cRawTextExample, CompletionItemKind.Snippet, cRawTextExample);
  receiver.Add("Translation component", cTranslationComponent, CompletionItemKind.Snippet, cTranslationComponent);
  receiver.Add("Translation component, with", cTranslationWith, CompletionItemKind.Snippet, cTranslationWith);
  receiver.Add("Translation component, with complex", cTranslationWithComplex, CompletionItemKind.Snippet, cTranslationWithComplex);
  receiver.Add("Text component", cTextComponent, CompletionItemKind.Snippet, cTextComponent);
  receiver.Add("Score component", cScoreComponent, CompletionItemKind.Snippet, cScoreComponent);
  receiver.Add("Selector component", cSelectorComponent, CompletionItemKind.Snippet, cSelectorComponent);
}
