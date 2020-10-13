/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { createConnection, ProposedFeatures } from "vscode-languageserver";
import { Manager } from "./Manager";
import { setEvents } from "./server/Events";
import { onInitializeAsync } from "./server/onInitialize";
import { onInitializedAsync } from "./server/onInitialized";
import { onShutdownAsync } from "./server/onShutdown";

console.log("starting minecraft server");

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);
Manager.Connection = connection;

setEvents();

// This handler provides diagnostics
connection.onInitialized(onInitializedAsync);

//Initialize
connection.onInitialize(onInitializeAsync);

//On shutdown
connection.onShutdown(onShutdownAsync);

//Initialize server
Manager.Documents.listen(connection);

// Listen on the connection
connection.listen();
