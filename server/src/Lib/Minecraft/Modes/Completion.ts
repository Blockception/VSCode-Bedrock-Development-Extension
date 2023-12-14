import { ModeCollection } from "bc-minecraft-bedrock-types/lib/src/Modes/ModeCollection";
import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../Code";
import { CompletionBuilder } from "../../Completion/Builder";

/**
 *
 * @param Mode
 * @param receiver
 * @param kind
 */
export function provideModeCompletion(Mode: ModeCollection, context: SimpleContext<CompletionBuilder>, kind: CompletionItemKind = CompletionItemKind.EnumMember): void {
  const Modes = Mode.modes;
  for (let I = 0; I < Modes.length; I++) {
    const Element = Modes[I];

    context.receiver.Add(Element.name, Element.documentation, kind);
  }
}

/**
 *
 * @param Mode
 * @param receiver
 * @param kind
 */
export function provideModeTestCompletion(Mode: ModeCollection, context: SimpleContext<CompletionBuilder>, kind: CompletionItemKind = CompletionItemKind.EnumMember): void {
  const Modes = Mode.modes;
  for (let I = 0; I < Modes.length; I++) {
    let Element = Modes[I];

    context.receiver.Add(Element.name, Element.documentation, kind);
    context.receiver.Add("!" + Element.name, Element.documentation, kind);
  }
}
