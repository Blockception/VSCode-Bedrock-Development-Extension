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
import { Location } from "vscode-languageserver";
import { Range } from "vscode-languageserver-textdocument";
import { RangedWord } from "./RangedWords";

export class LocationWord {
  public text: string;
  public range: Range;
  public uri: string;

  constructor(word: RangedWord, lineIndex: number, uri: string) {
    this.text = word.text;
    this.range = word.ToRange(lineIndex);
    this.uri = uri;
  }

  CreateLocation(): Location {
    return Location.create(this.uri, this.range);
  }

  //returns true or false is the cursor is inside this word
  CheckCursor(cursorPos: number): boolean {
    if (cursorPos >= this.range.start.character && cursorPos <= this.range.end.character) {
      return true;
    }

    return false;
  }

  substring(start: number, end?: number | undefined): LocationWord {
    let text = this.text.substring(start, end);

    let startindex = start + this.range.start.character;
    let RW = new RangedWord(text, startindex, startindex + text.length);
    let out = new LocationWord(RW, this.range.start.line, this.uri);
    return out;
  }

  //Converts the given text into words
  static GetWords(text: string, lineIndex: number, uri: string): LocationWord[] {
    let Words = RangedWord.GetWords(text);
    let Out = LocationWord.ConvertAll(Words, lineIndex, uri);

    return Out;
  }
}

export namespace LocationWord {
  export function ConvertAll(Words: RangedWord[], lineIndex: number, uri: string): LocationWord[] {
    let Out: LocationWord[] = [];

    for (let index = 0; index < Words.length; index++) {
      const element = Words[index];
      Out.push(new LocationWord(Words[index], lineIndex, uri));
    }

    return Out;
  }
}
