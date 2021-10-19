/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as vscode from "vscode";
import { SetupClient } from "./Client/Client";
import { Activate } from "./Commands/Activate";

import { Manager } from "./Manager/Manager";
import { RegisterTasks } from './Tasks/Tasks';

export function activate(context: vscode.ExtensionContext): void {
  Activate(context);
  SetupClient(context);
  RegisterTasks(context);
}

//shutdown server
export function deactivate(): Thenable<void> | undefined {
  console.log("stopping minecraft language client");

  if (!Manager.Client) {
    return undefined;
  }

  return Manager.Client.stop();
}
