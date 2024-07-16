import { BulkRegistration, createConnection, ProposedFeatures } from "vscode-languageserver/node";
import { Manager } from "../../manager/manager";
import { setupHandlers } from "./events/setup-handlers";
import { onInitialize } from "./events/on-initialize";
import { ServiceManager } from "../services/collection";
import { Traverse } from "../process";
import { HandleError } from "../../util";
import { SetDynamicEvents } from "./events";
import { ExtendedLogger } from "../../logger/logger";
import { UpdateSettings } from './events/on-configuration';

export function SetupServer() {
  // Create a connection for the server, using Node's IPC as a transport.
  // Also include all preview / proposed LSP features.
  const connection = createConnection(ProposedFeatures.all);
  Manager.Connection = connection;

  const logger = new ExtendedLogger(connection.console);
  const service = new ServiceManager(logger);

  logger.info("starting minecraft server");
  setupHandlers();

  // On shutdown handler
  connection.onShutdown(() => {
    logger.info("Shutting down server");
    service.dispose();
  });

  //Initialize
  connection.onInitialize((params) => {
    const result = onInitialize(params);
    service.onInitialize(params, result, connection);
    return result;
  });

  // This handler provides diagnostics
  connection.onInitialized(async (params) => {
    logger.info("Initialized minecraft server");

    //Update the settings of the language server
    UpdateSettings();

    //Registers any follow ups
    const register = BulkRegistration.create();
    SetDynamicEvents(register);
    service.dynamicRegister(register);
    await connection.client.register(register);

    service.start();

    return Traverse().catch((err) => HandleError(err));
  });

  //Initialize server
  Manager.Documents.listen(connection);

  // Listen on the connection
  connection.listen();
}
