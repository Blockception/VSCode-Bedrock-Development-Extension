import { TextDocument } from "vscode-languageserver-textdocument";
import { ServerSettings } from "../Server/Settings";
import { ExtensionState } from "./Extension State";
import { ExtensionData } from "./Extension Data";
import { ExtensionCapabiltities } from "./Extension Capabilties";
import { Connection } from "vscode-languageserver/lib/common/server";
import { Diagnostic } from "vscode-languageserver";

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
