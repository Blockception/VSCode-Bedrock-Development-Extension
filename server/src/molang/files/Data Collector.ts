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
