/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as vscode from "vscode";
import { setupClient } from "./client/client";
import * as Commands from "./commands";

import { Manager } from "./manager/manager";

export function activate(context: vscode.ExtensionContext): void {
  Commands.activate(context);
  setupClient(context);
}

//shutdown server
export function deactivate(): Thenable<void> | undefined {
  console.log("stopping minecraft language client");

  if (!Manager.Client) {
    return undefined;
  }

  return Manager.Client.stop();
}
