import { BulkRegistration, createConnection, ProposedFeatures } from "vscode-languageserver/node";
import { Manager } from "../../manager/manager";
import { setupHandlers } from "./events/setup-handlers";
import { onInitialize } from "./events/on-initialize";
import { ServiceManager } from "../services/collection";
import { Traverse } from "../process";
import { HandleError } from "../../util";
import { SetDynamicEvents } from "./events";
import { ExtendedLogger } from "../logger/logger";
import { updateSettings } from "./events/on-configuration";
import { ExtensionContext } from "../extension/context";
import { CapabilityBuilder } from "../services/capabilities";
import { CompletionService } from '../completion/service';

export function setupServer() {
  // Create a connection for the server, using Node's IPC as a transport.
  // Also include all preview / proposed LSP features.
  const connection = createConnection(ProposedFeatures.all);
  Manager.Connection = connection;

  const logger = new ExtendedLogger(connection.console);
  const extensionContext = new ExtensionContext();
  const manager = new ServiceManager(logger);
  manager.add(
    new CompletionService(logger, extensionContext)
  )

  logger.info("starting minecraft server");
  setupHandlers();

  // On shutdown handler
  connection.onShutdown(() => {
    logger.info("Shutting down server");
    manager.dispose();
  });

  //Initialize
  connection.onInitialize((params) => {
    const result = onInitialize(params);
    const builder = new CapabilityBuilder(result.capabilities);
    manager.onInitialize(builder, params, connection);
    result.capabilities = builder.result();
    return result;
  });

  // This handler provides diagnostics
  connection.onInitialized(async (params) => {
    logger.info("Initialized minecraft server");

    //Update the settings of the language server
    updateSettings();

    //Registers any follow ups
    const register = BulkRegistration.create();
    SetDynamicEvents(register);
    manager.dynamicRegister(register);
    await connection.client.register(register);

    manager.start();

    return Traverse().catch((err) => HandleError(err));
  });

  //Initialize server
  Manager.Documents.listen(connection);

  // Listen on the connection
  connection.listen();
}
