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
import { CompletionParams, CompletionList } from "vscode-languageserver";
import { GetDocument, removeDuplicate } from "../code/include";
import { McFunctionIdentifier } from "../Constants";
import { OnCompletionMcFunction } from "./McfunctionCompletion";

//Handle request
export async function OnCompletionRequest(params: CompletionParams) : Promise<CompletionList> {
  return new Promise((resolve, reject)=>{
    resolve(InternalOnCompletionRequest(params));
  });
}

//Processes request
function InternalOnCompletionRequest(params: CompletionParams) : CompletionList {
  let List: CompletionList;

  List = {
    isIncomplete: true,
    items: [],
  };

  let Doc = GetDocument(params.textDocument.uri);
  let Pos = params.position;

  switch(Doc.LanguageID){
    case McFunctionIdentifier:
      OnCompletionMcFunction(Doc, Pos, List);
      break;
  }

  List.items = removeDuplicate(List.items);
  List.isIncomplete = false;

  return List;
}