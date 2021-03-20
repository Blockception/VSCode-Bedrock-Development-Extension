/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { isMainThread } from "worker_threads";
import { Setup } from "./Server/Setup";

//Setup the server
if (isMainThread) {
  Setup();
} else {
  //If worker thread
}
