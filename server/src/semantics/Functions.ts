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

import { LocationWord } from "../code/words/include";
import { McfunctionSemanticTokensBuilder } from "./builders/include";
import { SemanticModifiersEnum, SemanticTokensEnum } from "./Legend";

export function CreateRangeTokensWord(Word: LocationWord, Builder: McfunctionSemanticTokensBuilder): void {
  CreateRangeTokens(Word.text, Word.range.start.line, Word.range.start.character, Builder);
}

export function CreateRangeTokens(value: string, line: number, start: number, Builder: McfunctionSemanticTokensBuilder): void {
  if (
    value.startsWith("~") ||
    value.startsWith("^") ||
    value.startsWith("-") ||
    value.startsWith("+") ||
    value.startsWith("+") ||
    value.startsWith("!")
  ) {
    Builder.AddAt(line, start, 1, SemanticTokensEnum.operator);

    value = value.substring(1);
    start++;
  }

  if (value === "") return;

  let Range = value.indexOf("..");

  if (Range >= 0) {
    var First = value.substring(0, Range);
    var Second = value.substring(Range + 2);

    Builder.AddAt(line, start + Range, 2, SemanticTokensEnum.operator);

    if (First && First !== "") {
      Builder.AddAt(line, start + value.indexOf(First), First.length, SemanticTokensEnum.number, SemanticModifiersEnum.readonly);
    }

    if (Second && Second !== "") {
      Builder.AddAt(line, start + value.indexOf(Second), Second.length, SemanticTokensEnum.number, SemanticModifiersEnum.readonly);
    }
  } else {
    Builder.AddAt(line, start, value.length, SemanticTokensEnum.number);
  }
}
