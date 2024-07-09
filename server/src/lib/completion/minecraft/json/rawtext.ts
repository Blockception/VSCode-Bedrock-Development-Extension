import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../../Code";
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
} from "../../../Minecraft/Json/RawText/Constants";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const receiver = context.receiver;

  receiver.add("Json Raw Text", cRawTextComponent, CompletionItemKind.Snippet, cRawTextComponent);
  receiver.add("Json Raw Text example", cRawTextExample, CompletionItemKind.Snippet, cRawTextExample);
  receiver.add("Translation component", cTranslationComponent, CompletionItemKind.Snippet, cTranslationComponent);
  receiver.add("Translation component, with", cTranslationWith, CompletionItemKind.Snippet, cTranslationWith);
  receiver.add("Translation component, with complex", cTranslationWithComplex, CompletionItemKind.Snippet, cTranslationWithComplex);
  receiver.add("Text component", cTextComponent, CompletionItemKind.Snippet, cTextComponent);
  receiver.add("Score component", cScoreComponent, CompletionItemKind.Snippet, cScoreComponent);
  receiver.add("Selector component", cSelectorComponent, CompletionItemKind.Snippet, cSelectorComponent);
}
