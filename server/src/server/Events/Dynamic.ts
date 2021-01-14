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
import {
  DocumentFormattingRegistrationOptions,
  DocumentFormattingRequest,
  SemanticTokensRegistrationOptions,
  SemanticTokensRegistrationType,
} from "vscode-languageserver";
import { Languages } from "../../Constants";
import { Manager } from "../../manager/Manager";
import { SemanticModifiers, SemanticTokens } from "../../semantics/Legend";

export function SetDynamicEvents() {
  let client = Manager.Connection.client;

  // Tell the client that this server supports code formatting.
  const Formatoptions: DocumentFormattingRegistrationOptions = {
    documentSelector: [Languages.McFunctionIdentifier, Languages.McLanguageIdentifier],
  };

  client.register(DocumentFormattingRequest.type, Formatoptions);

  // Tell the client that this server supports semantic tokens
  const registrationOptions: SemanticTokensRegistrationOptions = {
    documentSelector: [
      Languages.JsonCIdentifier,
      Languages.JsonIdentifier,
      Languages.McFunctionIdentifier,
      Languages.McLanguageIdentifier,
      Languages.McOtherIdentifier,
    ],
    legend: {
      tokenModifiers: SemanticModifiers,
      tokenTypes: SemanticTokens,
    },
    range: true,
    full: true,
  };
  client.register(SemanticTokensRegistrationType.type, registrationOptions);
}
