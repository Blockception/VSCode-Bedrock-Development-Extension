import { ServerSettings } from "../Server/Settings/Settings";
import { ExtensionState } from "./State";
import { ExtensionCapabilities } from "./Capabilities";
import { Connection } from "vscode-languageserver/lib/common/server";
import { Diagnostic } from "vscode-languageserver";
import { TextDocuments } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

/**
 *
 */
export class Manager {
  /**The different state the manager can possibly have or be in*/
  public static State: ExtensionState = new ExtensionState();

  /**The document manager that has possible cached documents, use GetDocument!*/
  public static Documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

  /**The possible capabilities of the server*/
  public static Capabilities = new ExtensionCapabilities();

  /**Server stuff*/
  public static Connection: Connection;

  /**The settings of the plugin*/
  public static Settings: ServerSettings = ServerSettings.createDefaultSettings();
}

/***/
export namespace Manager {
  /***/
  export namespace Diagnostic {
    /**Sends the diagnostics to the client
     * @param doc
     * @param Diagnostics
     */
    export function SendDiagnostics(doc: TextDocument, Diagnostics: Diagnostic[]): void {
      Manager.Connection.sendDiagnostics({
        diagnostics: Diagnostics,
        uri: doc.uri,
        version: doc.version,
      });
    }

    /**
     *
     * @param doc
     */
    export function ResetDocument(doc: TextDocument | string): void {
      if (typeof doc === "string") {
        Manager.Connection.sendDiagnostics({ diagnostics: [], uri: doc });
      } else {
        Manager.Connection.sendDiagnostics({ diagnostics: [], uri: doc.uri, version: doc.version });
      }
    }
  }

  /**
   *
   * @returns
   */
  export function clonedSettings(): ServerSettings {
    return ServerSettings.clone(Manager.Settings);
  }
}
