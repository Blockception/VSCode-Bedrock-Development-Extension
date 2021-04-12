import { Range, TextEdit } from "vscode-languageserver";

export function Replace(line: string, oldText: string, newText: string, lineIndex: number, receiver: TextEdit[]) {
  let Index = line.indexOf(oldText);

  while (Index > -1) {
    let R = Range.create(lineIndex, Index, lineIndex, Index + oldText.length);
    receiver.push(TextEdit.replace(R, newText));

    Index = line.indexOf(oldText, Index + 1);
  }
}

//Loop through starting character to filters out empty characters and slashes
export function TrimStartFromLine(line: string, index: number, Collector: TextEdit[], ToRemove: string[]) {
  let Text = line;
  let LineIndex = index;
  let startindex = 0;
  let Loop = true;

  while (Loop) {
    Loop = false;

    ToRemove.forEach((x) => {
      if (x == Text.substring(startindex, startindex + x.length)) {
        Loop = true;
        startindex += x.length;
      }
    });
  }

  //If any unwanted character are found, remove them
  if (startindex > 0) {
    Collector.push(TextEdit.del(Range.create(LineIndex, 0, LineIndex, startindex)));
  }
}

export function TrimEndFromLine(line: string, index: number, Collector: TextEdit[], ToRemove: string[]): void {
  let Text = line;
  let LineIndex = index;
  let startindex = Text.length - 1;
  let endindex = Text.length;
  startindex = endindex;
  let Loop = true;

  while (Loop) {
    Loop = false;

    ToRemove.forEach((x) => {
      if (x == Text.substring(startindex, startindex + x.length)) {
        Loop = true;
        startindex -= x.length;
      }
    });
  }

  startindex++;

  if (startindex < endindex) {
    Collector.push(TextEdit.del(Range.create(LineIndex, startindex, LineIndex, endindex)));
  }
}
