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
import { InitializeParams, InitializeResult, TextDocumentSyncKind } from "vscode-languageserver";
import { Manager } from "../manager/Manager";

export async function onInitializeAsync(params: InitializeParams): Promise<InitializeResult> {
  return new Promise<InitializeResult>((resolve, reject) => {
    resolve(onInitialize(params));
  });
}

function onInitialize(params: InitializeParams): InitializeResult {
  console.log("Initializing minecraft server");

  //process capabilities of the client
  let capabilities = params.capabilities;
  Manager.Capabiltities.Parse(capabilities);

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,

      // Tell the client that this server supports a couple commands
      /*executeCommandProvider: {
        commands: ["bc.minecraft.errors.import"]
      },*/

      // Tell the client that this server code formatting.
      documentFormattingProvider: {},
      documentRangeFormattingProvider: {},

      // Tell the client that this server supports go to defintitions
      definitionProvider: true,
      typeDefinitionProvider: true,

      // Tell the client that this server supports symbol provider
      documentSymbolProvider: true,
      workspaceSymbolProvider: true,

      // Tell the client that this server supports hover support
      hoverProvider: true,

      // Tell the client that this server supports code completion.
      completionProvider: {
        resolveProvider: false,
        triggerCharacters: [" ", "\t", "[", "=", ","],
      },

      // Tell the client that this server supports go to references
      referencesProvider: true,

      // Tell the client that this server supports signatures
      signatureHelpProvider: {
        triggerCharacters: [" "],
        retriggerCharacters: [" ", "\t"],
      },

      workspace: {
        workspaceFolders: {
          changeNotifications: true,
          supported: true
        }
      }
    },
    serverInfo: {
      name: "BC-minecraft-language-server",
    },
  };

  if (Manager.Capabiltities.hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true,
      },
    };
  }

  return result;
}
