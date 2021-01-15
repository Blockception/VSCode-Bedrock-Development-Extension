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
import { ReferenceParams, Location } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getLine } from "../code/include";
import { SearchDefinition } from "../definition/Search";
import { CommandIntr } from "../types/commands/interpertation/include";
import { MCCommandParameterType } from "../types/commands/parameter/include";

export function ProvideMcfunctionsReferences(params: ReferenceParams, doc: TextDocument): Location[] | undefined {
  const Line = getLine(doc, params.position.line);
  let com = CommandIntr.parse(Line, params.position, doc.uri);

  let data = com.GetCommandData();

  if (data.length == 0) {
    return undefined;
  }

  let Types: MCCommandParameterType[] = [];
  let Current = com.GetCurrent();

  if (Current == undefined) return;

  let Index = com.CursorParamater;
  let Text = Current.text;

  for (let I = 0; I < data.length; I++) {
    let Pattern = data[I];
    let Parameters = Pattern.Command.parameters;

    if (Parameters.length >= Index) {
      Types.push(Parameters[Index].Type);
    }
  }

  if (Types.length == 0) return undefined;

  return SearchDefinition(Text, Types);
}
