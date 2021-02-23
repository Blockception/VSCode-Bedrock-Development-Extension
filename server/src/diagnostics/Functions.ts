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
import { DiagnosticSeverity } from "vscode-languageserver";
import { Range } from "vscode-languageserver-textdocument";
import { DiagnosticsBuilder } from "./Builder";

/**
 * @deprecated Use the builder normally
 * @param builder
 * @param Line
 * @param start
 * @param end
 * @param message
 */
export function NewError(builder: DiagnosticsBuilder, Line: number, start: number, end: number, message: string) {
  builder.Add(message, { start: { character: start, line: Line }, end: { character: end, line: Line } });
}

/**
 * * @deprecated Use the builder normally
 * @param builder
 * @param range
 * @param message
 */
export function NewError2(builder: DiagnosticsBuilder, range: Range, message: string) {
  builder.Add(message, range);
}

/**
 ** @deprecated Use the builder normally
 * @param builder
 * @param range
 * @param message
 */
export function NewWarning(builder: DiagnosticsBuilder, range: Range, message: string) {
  builder.Add(message, range, DiagnosticSeverity.Warning);
}
