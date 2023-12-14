import { Modes } from "bc-minecraft-bedrock-types";
import { OffsetWord } from "bc-vscode-words";
import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../../Completion/Builder";
import { provideModeCompletion } from "../../../Modes/Completion";

//Doesnt do scores and doesnt need to
export function provideCompletion(context: SimpleContext<CompletionBuilder>, forEntities: boolean): void {
  provideModeCompletion(Modes.SelectorAttribute, context, CompletionItemKind.Property);
}

/**
 *
 * @param selector
 * @param pos
 * @returns
 */
export function GetCurrentAttribute(selector: OffsetWord, pos: number): string {
  let StartIndex = pos - selector.offset;

  while (StartIndex > 2) {
    let C = selector.text.charAt(StartIndex);

    if (C === "," || C === "{") {
      break;
    }

    StartIndex--;
  }

  StartIndex++;
  let EndIndex = selector.text.indexOf("=", StartIndex);

  if (EndIndex < 0) EndIndex = selector.text.length;

  return selector.text.slice(StartIndex, EndIndex).trim();
}
