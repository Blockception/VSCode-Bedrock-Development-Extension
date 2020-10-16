/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from "path";
import * as vscode from "vscode";

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
  TextDocument,
  WorkspaceChange,
} from "vscode-languageclient";
import { McFunctionIdentifier, McLanguageIdentifier } from "./Constants";

//The client to the server
let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
  console.log("starting minecraft language client");

  // The server is implemented in node
  let serverModule = context.asAbsolutePath(
    path.join("server", "out", "server.js")
  );

  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  let debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  let serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    // Register the server for plain text documents
    documentSelector: [
      { scheme: "file", language: McFunctionIdentifier },
      { scheme: "file", language: McLanguageIdentifier },
      { scheme: "file", language: "json" },
      { scheme: "file", language: "jsonc" },
    ],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: vscode.workspace.createFileSystemWatcher("**/.clientrc"),
    }
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    "languageBlockceptionMinecraftClient",
    "Language Server Blockception minecraft",
    serverOptions,
    clientOptions
  );

  // Start the client. This will also launch the server
  client.start();
}

//shutdown server
export function deactivate(): Thenable<void> | undefined {
  console.log("stopping minecraft language client");

  if (!client) {
    return undefined;
  }

  return client.stop();
}
