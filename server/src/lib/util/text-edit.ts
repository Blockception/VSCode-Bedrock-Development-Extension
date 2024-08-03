import { Range, TextEdit } from "vscode-languageserver";

/**
 *
 * @param line
 * @param oldText
 * @param newText
 * @param lineIndex
 * @param receiver
 */
export function Replace(line: string, oldText: string, newText: string, lineIndex: number, receiver: TextEdit[]) {
  let Index = line.indexOf(oldText);

  while (Index > -1) {
    let R = Range.create(lineIndex, Index, lineIndex, Index + oldText.length);
    receiver.push(TextEdit.replace(R, newText));

    Index = line.indexOf(oldText, Index + 1);
  }
}

/**
 * Loop through starting character to filters out empty characters and slashes
 * @param line The line to edit
 * @param index The index of the line
 * @param receiver
 * @param toRemove
 */
export function TrimStartFromLine(line: string, index: number, receiver: TextEdit[], toRemove: string[]) {
  const text = line;
  const lineIndex = index;
  let startindex = 0;
  let loop = true;

  while (loop) {
    loop = false;

    toRemove.forEach((x) => {
      if (x == text.substring(startindex, startindex + x.length)) {
        loop = true;
        startindex += x.length;
      }
    });
  }

  //If any unwanted character are found, remove them
  if (startindex > 0) {
    receiver.push(TextEdit.del(Range.create(lineIndex, 0, lineIndex, startindex)));
  }
}

/**
 *
 * @param line
 * @param index
 * @param receiver
 * @param toRemove*/
export function TrimEndFromLine(line: string, index: number, receiver: TextEdit[], toRemove: string[]): void {
  const text = line;
  const lineIndex = index;
  let startindex = text.length - 1;
  let endindex = text.length;
  startindex = endindex;
  let loop = true;

  while (loop) {
    loop = false;

    toRemove.forEach((x) => {
      if (x == text.substring(startindex, startindex + x.length)) {
        loop = true;
        startindex -= x.length;
      }
    });
  }

  startindex++;

  if (startindex < endindex) {
    receiver.push(TextEdit.del(Range.create(lineIndex, startindex, lineIndex, endindex)));
  }
}
