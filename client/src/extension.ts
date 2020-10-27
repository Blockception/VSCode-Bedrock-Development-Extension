/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as vscode from "vscode";
import { SetupClient } from './client/client';

import { Manager } from './Manager/Manager';

export function activate(context: vscode.ExtensionContext) {

  SetupClient(context);
}

//shutdown server
export function deactivate(): Thenable<void> | undefined {
  console.log("stopping minecraft language client");

  if (!Manager.Client) {
    return undefined;
  }

  return Manager.Client.stop();
}
