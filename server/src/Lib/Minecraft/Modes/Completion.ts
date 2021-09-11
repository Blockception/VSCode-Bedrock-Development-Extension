import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../Completion/Builder";
import { ModeCollection } from "./Interface";

export function ProvideModeCompletion(Mode: ModeCollection, receiver: CompletionBuilder, kind: CompletionItemKind = CompletionItemKind.EnumMember): void {
  const Modes = Mode.Modes;
  for (let I = 0; I < Modes.length; I++) {
    let Element = Modes[I];

    receiver.Add(Element.Name, Element.Description, kind);
  }
}

export function ProvideModeTestCompletion(Mode: ModeCollection, receiver: CompletionBuilder, kind: CompletionItemKind = CompletionItemKind.EnumMember): void {
  const Modes = Mode.Modes;
  for (let I = 0; I < Modes.length; I++) {
    let Element = Modes[I];

    receiver.Add(Element.Name, Element.Description, kind);
    receiver.Add("!" + Element.Name, Element.Description, kind);
  }
}
