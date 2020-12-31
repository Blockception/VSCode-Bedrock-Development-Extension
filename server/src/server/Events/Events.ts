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
import { OnCommandRequestAsync } from "../../commands/OnRequest";
import { OnCompletionRequestAsync } from "../../completion/OnRequest";
import { onDefinitionRequestAsync, onTypeDefinitionRequestAsync } from "../../definition/OnRequest";
import { OnDocumentFormatRequestAsync, OnDocumentRangeFormatRequestAsync } from "../../format/OnRequest";
import { OnHoverRequestAsync } from "../../hover/OnRequest";
import { Manager } from "../../manager/Manager";
import { OnReferencesRequestAsync } from "../../references/OnRequest";
import { OnSignatureRequestAsync } from "../../signatures/OnRequest";
import { OnDocumentSymbolRequestAsync, OnWorkspaceSymbolRequestAsync } from "../../symbols/OnRequest";
import { OndDocumentChangedAsync } from "./Documents";
import { onDidChangeConfigurationAsync } from "../OnConfiguration";
import { OnProvideRangeSemanticRequestAsync, OnProvideSemanticRequestAsync } from "../../semantics/include";

/**
 * Setup the server events
 */
export function setEvents() {
  let Documents = Manager.Data.Documents;
  let Connection = Manager.Connection;

  //Provides diagnostics and such
  Documents.onDidOpen(OndDocumentChangedAsync);
  Documents.onDidSave(OndDocumentChangedAsync);

  //Connection.workspace.onDidChangeWorkspaceFolders(OnWorkspaceFolderChangeAsync);

  // This handler provides commands
  Connection.onExecuteCommand(OnCommandRequestAsync);

  // This handler provides completion items.
  Connection.onCompletion(OnCompletionRequestAsync);

  // This handler provides go to definitions
  Connection.onDefinition(onDefinitionRequestAsync);
  Connection.onTypeDefinition(onTypeDefinitionRequestAsync);

  // This handler provides formatting
  Connection.onDocumentFormatting(OnDocumentFormatRequestAsync);
  Connection.onDocumentRangeFormatting(OnDocumentRangeFormatRequestAsync);

  // This handler provides document/workspace symbols
  Connection.onDocumentSymbol(OnDocumentSymbolRequestAsync);
  Connection.onWorkspaceSymbol(OnWorkspaceSymbolRequestAsync);

  // This handler provides support for when a configuration changes
  Connection.onDidChangeConfiguration(onDidChangeConfigurationAsync);

  // This handler provides hover support
  Connection.onHover(OnHoverRequestAsync);

  // This handler provides references
  Connection.onReferences(OnReferencesRequestAsync);

  // This handler provides signatures
  Connection.onSignatureHelp(OnSignatureRequestAsync);

  // This handler provides semantic Tokens
  Connection.languages.semanticTokens.on(OnProvideSemanticRequestAsync);
  Connection.languages.semanticTokens.onRange(OnProvideRangeSemanticRequestAsync);
}
