import { ServerSettings } from "../Server/Settings/Settings";
import { ExtensionState } from "./State";
import { ExtensionCapabiltities } from "./Capabilties";
import { Connection } from "vscode-languageserver/lib/common/server";
import { Diagnostic } from "vscode-languageserver";
import { TextDocuments } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

/**
 *
 */
export class Manager {
  /**The different state the manager can posssibly have or be in*/
  public static State: ExtensionState = new ExtensionState();

  /**The document manager that has possible cached documents, use GetDocument!*/
  public static Documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

  /**The possible capabiltities of the server*/
  public static Capabiltities = new ExtensionCapabiltities();

  /**Server stuff*/
  public static Connection: Connection;

  /** */
  public static Settings: ServerSettings = ServerSettings.createDefaulSettings();
}

/***/
export namespace Manager {
  /***/
  export namespace Diagnostic {
    /**Sends the diagnostics to the client*/
    export function SendDiagnostics(doc: TextDocument, Diagnostics: Diagnostic[]): void {
      Manager.Connection.sendDiagnostics({ diagnostics: Diagnostics, uri: doc.uri, version: doc.version });
    }
  }
}
