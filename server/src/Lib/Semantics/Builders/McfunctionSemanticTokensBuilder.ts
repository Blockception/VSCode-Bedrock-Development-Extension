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
import { LocationWord, RangedWord } from "bc-vscode-words";
import { SemanticTokens, SemanticTokensBuilder } from "vscode-languageserver";
import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { SemanticModifiersEnum, SemanticTokensEnum } from "../include";
import { JsonSemanticTokensBuilder } from "./include";

export class McfunctionSemanticTokensBuilder {
  public Builder: SemanticTokensBuilder;
  public doc: TextDocument;

  constructor(doc: TextDocument) {
    this.doc = doc;
    this.Builder = new SemanticTokensBuilder();
  }

  Build(): SemanticTokens {
    return this.Builder.build();
  }

  PositionAt(offset: number): Position {
    return this.doc.positionAt(offset);
  }

  /**
   * Adds the given text locations into the tokens builder
   * @param startindex
   * @param endindex
   * @param tokenType
   * @param tokenModifier
   */
  Add(startindex: number, endindex: number, tokenType: SemanticTokensEnum, tokenModifier: SemanticModifiersEnum = SemanticModifiersEnum.declaration): void {
    let p = this.doc.positionAt(startindex);
    let length = endindex - startindex;
    this.Builder.push(p.line, p.character, length, tokenType, tokenModifier);
  }

  AddWord(word: LocationWord | RangedWord, tokenType: SemanticTokensEnum, tokenModifier: SemanticModifiersEnum = SemanticModifiersEnum.declaration): void {
    let p: Position = RangedWord.is(word) ? word.range.start : word.location.range.start;

    let length = word.text.length;
    this.Builder.push(p.line, p.character, length, tokenType, tokenModifier);
  }

  AddAt(line: number, char: number, length: number, tokenType: SemanticTokensEnum, tokenModifier: SemanticModifiersEnum = SemanticModifiersEnum.declaration): void {
    this.Builder.push(line, char, length, tokenType, tokenModifier);
  }

  static FromJson(Builder: JsonSemanticTokensBuilder): McfunctionSemanticTokensBuilder {
    let Out = new McfunctionSemanticTokensBuilder(Builder.doc);
    Out.Builder = Builder.Builder;

    return Out;
  }
}
