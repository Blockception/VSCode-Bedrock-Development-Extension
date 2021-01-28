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
import * as Json from "./Json";
import * as Language from "./Language";
import { GetFilename } from "../code/include";
import { TextDocument } from "vscode-languageserver-textdocument";
import { behavior } from "../types/minecraft/include";
import { Languages } from "../include";
import { ValidateBehaviourFolder, ValidateResourceFolder } from "./Validate";
import { DetectGeneralDataType, GeneralDataType } from "../types/minecraft/format/include";
import { Console } from "../console/Console";

//Process the given document
export function Process(document: TextDocument): void {
  Console.Log("Processing: " + GetFilename(document.uri) + " | " + document.languageId);

  switch (document.languageId) {
    case Languages.McFunctionIdentifier:
      behavior.functions.Process(document);
      break;

    case Languages.McLanguageIdentifier:
      Language.ProcessLanguageFile(document);
      break;

    case Languages.McOtherIdentifier:
      break;

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      Json.ProcessJson(document);
      break;
  }

  //Validate folder
  let Type = DetectGeneralDataType(document.uri);

  switch (Type) {
    case GeneralDataType.unknown:
      return;

    case GeneralDataType.behaviour_pack:
      ValidateBehaviourFolder(document);
      break;

    case GeneralDataType.resource_pack:
      ValidateResourceFolder(document);
      break;
  }
}
