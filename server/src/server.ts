/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { createConnection, ProposedFeatures } from 'vscode-languageserver';
import { Manager } from './Manager';
import { setEvents } from './server/Events';
import { onInitialize } from './server/onInitialize';
import { onInitialized } from './server/onInitialized';

console.log('starting minecraft server');

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);
Manager.Connection = connection;

setEvents();

// This handler provides diagnostics
connection.onInitialized(onInitialized);

//Initialize
connection.onInitialize(onInitialize);

//Initialize server
Manager.Documents.listen(connection);

// Listen on the connection
connection.listen();
