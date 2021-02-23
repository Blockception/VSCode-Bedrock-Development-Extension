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
import { LocationWord, OffsetWord, PositionCalculator, RangedWord } from "bc-vscode-words";
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { Range, TextDocument } from "vscode-languageserver-textdocument";
import { Manager } from "../manager/include";
import { EmptyTypes } from "../types/general/Empty";

export class DiagnosticsBuilder {
  private calculator: PositionCalculator;
  public doc: TextDocument;
  public Items: Diagnostic[];

  constructor(doc: TextDocument) {
    this.doc = doc;
    this.calculator = PositionCalculator.Wrap(doc);
    this.Items = [];
  }

  public SendDiagnostics() {
    Manager.Diagnostic.SendDiagnostics(this.doc, this.Items);
  }

  public AddWord(Word: OffsetWord | RangedWord | LocationWord, message: string, serverity: DiagnosticSeverity = DiagnosticSeverity.Error) {
    let range: Range;

    if (OffsetWord.is(Word)) {
      range = this.calculator.rangeOf(Word.offset, Word.offset + Word.text.length);
    } else if (RangedWord.is(Word)) {
      range = Word.range;
    } else {
      range = Word.location.range;
    }

    this.Items.push({
      message: message,
      severity: serverity,
      range: range,
    });
  }

  public Add(message: string, range: Range | undefined = undefined, serverity: DiagnosticSeverity = DiagnosticSeverity.Error) {
    if (range === undefined) {
      range = EmptyTypes.EmptyRange();
    }

    this.Items.push({
      message: message,
      severity: serverity,
      range: range,
    });
  }

  public AddAt(message: string, line: number, startindex: number, endindex: number, serverity: DiagnosticSeverity = DiagnosticSeverity.Error) {
    this.Add(message, { start: { character: startindex, line: line }, end: { character: endindex, line: line } }, serverity);
  }
}
