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
import { TextDocument } from "vscode-languageserver-textdocument";
import { Connection, Diagnostic, TextDocuments, _ } from "vscode-languageserver";
import { ServerSettings } from "../server/Settings";
import { ExtensionState } from "./Extension State";
import { ExtensionData } from "./Extension Data";
import { ExtensionCapabiltities } from "./Extension Capabilties";

export class Manager {
  /**
   * The different state the manager can posssibly have or be in
   */
  static State: ExtensionState = new ExtensionState();

  /**
   * The data that the extension can have
   */
  static Data: ExtensionData = new ExtensionData();

  /**
   * The possible capabiltities of the server
   */
  static Capabiltities = new ExtensionCapabiltities();

  //Server stuff
  static Connection: Connection;
  static Settings: ServerSettings = ServerSettings.createDefaulSettings();
}

export namespace Manager {
  export namespace Diagnostic {
    /**
     * Sends the diagnostics to the client
     */
    export function SendDiagnostics(doc: TextDocument, Diagnostics: Diagnostic[]): void {
      Manager.Connection.sendDiagnostics({
        diagnostics: Diagnostics,
        uri: doc.uri,
      });
    }
  }
}
