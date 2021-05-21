import { LocationWord } from "bc-vscode-words";
import { Position, Range } from "vscode-languageserver-textdocument";
import { ProcessCommand } from "../Types/Commands/include";
import { TextDocument } from "../Types/Document/TextDocument";
import { DataCollector } from "./Files/Data Collector";

/**
 *
 * @param text
 * @param Start
 * @param doc
 */
export function Process(text: string, Start: Position, doc: TextDocument) {
  if (text.startsWith("/")) {
    let command = text.substring(1);
    ProcessCommand(command, { character: Start.character + 1, line: Start.line }, doc);
  } else if (text.startsWith("@s ")) {
    //Process event
  } else {
    //Process general molang
  }
}

/**
 *
 * @param text
 * @param range
 * @param doc
 * @param receiver
 */
export function ProcessInto(text: string, range: Range, doc: TextDocument, receiver: DataCollector) {
  if (text.startsWith("/")) {
    range.start.character += 1;
    receiver.Command.push(new LocationWord(text.substring(1), doc.uri, range));
  } else if (text.startsWith("@s ")) {
    range.start.character += 3;
    receiver.Events.push(new LocationWord(text.substring(3), doc.uri, range));
  } else {
    receiver.Molang.push(new LocationWord(text, doc.uri, range));
  }
}
