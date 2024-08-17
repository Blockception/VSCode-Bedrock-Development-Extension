import { Modes } from "bc-minecraft-bedrock-types";
import { OffsetWord } from "bc-vscode-words";
import { CompletionItemKind } from "vscode-languageserver";
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';
import { provideModeCompletion } from "../modes/modes";

//Doesnt do scores and doesnt need to
export function provideCompletion(context: Context<CompletionContext>, forEntities: boolean): void {
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
    const character = selector.text.charAt(StartIndex);

    if (character === "," || character === "{") {
      break;
    }

    StartIndex--;
  }

  StartIndex++;
  let EndIndex = selector.text.indexOf("=", StartIndex);

  if (EndIndex < 0) EndIndex = selector.text.length;

  return selector.text.slice(StartIndex, EndIndex).trim();
}
