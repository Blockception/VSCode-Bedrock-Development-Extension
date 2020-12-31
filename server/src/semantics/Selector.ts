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
import { IParameter, IScoreParameter, Selector } from "../types/general/Selector/include";
import { McfunctionSemanticTokensBuilder } from "./builders/McfunctionSemanticTokensBuilder";
import { SemanticModifiersEnum, SemanticTokensEnum } from "./Legend";

export function CreateSelectorTokens(Word: LocationWord, Builder: McfunctionSemanticTokensBuilder): void {
  let sel = Selector.Parse(Word);

  ProcessParameters(sel.Parameters, Builder);
}

function ProcessParameters(Paramaters: IParameter[], Builder: McfunctionSemanticTokensBuilder): void {
  for (let I = 0; I < Paramaters.length; I++) {
    let parameter = Paramaters[I];

    CreateTokens(parameter, Builder);
  }
}

function CreateTokens(Parameter: IParameter | IScoreParameter, Builder: McfunctionSemanticTokensBuilder): void {
  //process header
  let P = Parameter.Range.start;
  let LineIndex = P.line;
  let startindex = P.character;
  let Length = Parameter.Name.length;
  let attribute = Parameter.Name;
  Builder.AddAt(LineIndex, startindex, Length, SemanticTokensEnum.parameter);

  if (IScoreParameter.is(Parameter)) {
    ProcessParameters(Parameter.Scores, Builder);
    return;
  }

  //startindex of the value
  startindex += Length = 1;
  let value = Parameter.Value;
  Length = value.length;

  switch (attribute) {
    case "name":
      Builder.AddAt(LineIndex, startindex, Length, SemanticTokensEnum.string);
      return;

    case "tag":
    default:
  }
}
