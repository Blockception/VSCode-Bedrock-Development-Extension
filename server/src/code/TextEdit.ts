/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import { Range, TextEdit } from "vscode-languageserver";

export function Replace(line: string, oldText: string, newText: string, lineIndex: number, receiver: TextEdit[]) {
  let Index = line.indexOf(oldText);

  while (Index > -1) {
    let R = Range.create(lineIndex, Index, lineIndex, Index + oldText.length);
    receiver.push(TextEdit.replace(R, newText));

    Index = line.indexOf(oldText, Index);
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
