import { LocationWord } from "bc-vscode-words";
import { Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { IsMolang } from "../include";

export class DataCollector {
  //
  Molang: LocationWord[];
  //
  Events: LocationWord[];
  //
  Command: LocationWord[];

  constructor() {
    this.Molang = [];
    this.Events = [];
    this.Command = [];
  }

  IsProperty(): boolean {
    return this.Events.length === 0 && this.Command.length === 0 && this.Molang.length === 0;
  }
}

export namespace DataCollector {
  export function Parse(doc: TextDocument): DataCollector {
    let index = 0;
    let text = doc.getText();
    let Out = new DataCollector();

    while (index >= 0) {
      let startindex = findNext(text, index);
      if (startindex < 0) break;

      let endindex = findNext(text, startindex + 1);
      if (endindex < 0) break;

      startindex++;
      let property = text.substring(startindex, endindex);
      index = endindex + 1;

      if (IsMolang(property)) {
        let range = Range.create(doc.positionAt(startindex), doc.positionAt(endindex));

        if (property.startsWith("/")) {
          range.start.character += 1;
          Out.Command.push(new LocationWord(property.substring(1), doc.uri, range));
        } else if (property.startsWith("@s ")) {
          range.start.character += 3;
          Out.Events.push(new LocationWord(property.substring(3), doc.uri, range));
        } else {
          Out.Molang.push(new LocationWord(property, doc.uri, range));
        }
      }
    }

    return Out;
  }
}

function findNext(text: string, startIndex: number): number {
  while (startIndex > -1) {
    let startindex = text.indexOf('"', startIndex);
    if (startindex < 0) break;

    if (text.charAt(startindex - 1) === "\\" && text.charAt(startindex - 2) !== "\\") {
      startIndex++;
      continue;
    }

    return startindex;
  }

  return -1;
}
