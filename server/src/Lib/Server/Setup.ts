import { createConnection, ProposedFeatures } from "vscode-languageserver/node";
import { Console } from "../Manager/Console";
import { Manager } from "../Manager/Manager";
import { setEvents } from "./Events/Events";
import { onInitializeAsync } from "./OnInitialize";
import { onInitializedAsync } from "./OnInitialized";
import { onShutdownAsync } from "./onShutdown";

export function SetupServer() {
  // Create a connection for the server, using Node's IPC as a transport.
  // Also include all preview / proposed LSP features.

  let connection = createConnection(ProposedFeatures.all);
  Manager.Connection = connection;

  Console.Log("starting minecraft server");

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
}
