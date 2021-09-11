import { ModeCollection } from "bc-minecraft-bedrock-types/lib/src/Modes/ModeCollection";
import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../Completion/Builder";

/**
 *
 * @param Mode
 * @param receiver
 * @param kind
 */
export function ProvideModeCompletion(Mode: ModeCollection, receiver: CompletionBuilder, kind: CompletionItemKind = CompletionItemKind.EnumMember): void {
  const Modes = Mode.modes;
  for (let I = 0; I < Modes.length; I++) {
    const Element = Modes[I];

    receiver.Add(Element.name, Element.documentation, kind);
  }
}

/**
 *
 * @param Mode
 * @param receiver
 * @param kind
 */
export function ProvideModeTestCompletion(Mode: ModeCollection, receiver: CompletionBuilder, kind: CompletionItemKind = CompletionItemKind.EnumMember): void {
  const Modes = Mode.modes;
  for (let I = 0; I < Modes.length; I++) {
    let Element = Modes[I];

    receiver.Add(Element.name, Element.documentation, kind);
    receiver.Add("!" + Element.name, Element.documentation, kind);
  }
}
