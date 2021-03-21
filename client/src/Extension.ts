/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as vscode from "vscode";
import { SetupClient } from "./Client/Client";
import { Activate } from "./Commands/Activate";
import { Console } from "./Console/include";

import { Manager } from "./Manager/Manager";

export function activate(context: vscode.ExtensionContext) {
  Activate(context);
  SetupClient(context);
}

//shutdown server
export function deactivate(): Thenable<void> | undefined {
  Console.Log("stopping minecraft language client");

  if (!Manager.Client) {
    return undefined;
  }

  return Manager.Client.stop();
}
