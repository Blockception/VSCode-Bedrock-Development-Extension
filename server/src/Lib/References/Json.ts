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
import { Location, ReferenceParams } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Json } from "../Lib/Code/include";
import { Database } from "../Database/include";

export function ProvideJsonReferences(params: ReferenceParams, doc: TextDocument): Location[] | undefined {
  let pos = params.position;

  const Text = doc.getText();
  let ElementRange = Json.GetCurrentElement(Text, doc.offsetAt(pos));

  if (!ElementRange) return undefined;

  const ElementText = Text.slice(ElementRange.start, ElementRange.end).trim();

  let Index = Text.indexOf(ElementText);
  let Out: Location[] = [];
  const uri = doc.uri;

  while (Index > -1) {
    if (Index < ElementRange.start || Index > ElementRange.end) {
      Out.push({
        range: {
          start: doc.positionAt(Index),
          end: doc.positionAt(Index + ElementText.length),
        },
        uri: uri,
      });
    }

    Index = Text.indexOf(ElementText, Index + ElementText.length);
  }

  Database.Data.FindReference(ElementText, Out);

  return Out;
}
