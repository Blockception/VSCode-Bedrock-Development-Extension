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
import { IParameter, IScoreParameter, Selector } from "../types/general/Selector/include";
import { McfunctionSemanticTokensBuilder } from "./builders/McfunctionSemanticTokensBuilder";
import { CreateRangeTokens } from "./Functions";
import { SemanticModifiersEnum, SemanticTokensEnum } from "./Legend";

export function CreateSelectorTokens(Word: LocationWord, Builder: McfunctionSemanticTokensBuilder): void {
  if (Word.text.startsWith("@")) {
    let sel = Selector.Parse(Word);

    let Start = Word.location.range.start;

    Builder.AddAt(Start.line, Start.character, 2, SemanticTokensEnum.enumMember, SemanticModifiersEnum.static);

    ProcessParameters(sel.Parameters, Builder);
  } else {
    Builder.AddWord(Word, SemanticTokensEnum.enumMember, SemanticModifiersEnum.static);
  }
}

function ProcessParameters(Parameters: IParameter[], Builder: McfunctionSemanticTokensBuilder): void {
  for (let I = 0; I < Parameters.length; I++) {
    let parameter = Parameters[I];

    CreateTokens(parameter, Builder);
  }
}

function ProcessScoreParameters(Parameters: IParameter[], Builder: McfunctionSemanticTokensBuilder): void {
  for (let I = 0; I < Parameters.length; I++) {
    let parameter = Parameters[I];

    CreateTokens(parameter, Builder);
  }
}

function CreateTokens(Parameter: IParameter | IScoreParameter, Builder: McfunctionSemanticTokensBuilder): void {
  //process header
  let Name = Parameter.Name;
  let Value = Parameter.Value;

  Builder.AddWord(Name, SemanticTokensEnum.parameter, SemanticModifiersEnum.readonly);

  if (IScoreParameter.is(Parameter)) {
    ProcessScoreParameters(Parameter.Scores, Builder);
    return;
  }

  switch (Name.text) {
    case "name":
      Builder.AddWord(Value, SemanticTokensEnum.string);
      break;

    case "tag":
      Builder.AddWord(Value, SemanticTokensEnum.regexp, SemanticModifiersEnum.readonly);
      break;

    case "type":
      let Index = Value.text.indexOf(":");

      if (Index >= 0) {
        let LineIndex = Value.range.start.line;
        let ValueStart = Value.range.start.character;

        Builder.AddAt(LineIndex, ValueStart, Index, SemanticTokensEnum.namespace, SemanticModifiersEnum.readonly);
        Builder.AddAt(LineIndex, Index + 1, Value.text.length - (Index + 1), SemanticTokensEnum.method, SemanticModifiersEnum.readonly);
      } else {
        Builder.AddWord(Value, SemanticTokensEnum.type, SemanticModifiersEnum.readonly);
      }
      break;

    default:
      CreateRangeTokens(Value, Builder);

      break;
  }
}
