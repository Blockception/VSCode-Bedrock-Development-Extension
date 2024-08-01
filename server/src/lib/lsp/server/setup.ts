import { BulkRegistration, createConnection, ProposedFeatures } from "vscode-languageserver/node";
import { setupHandlers } from "./events/setup-handlers";
import { onInitialize } from "./events/on-initialize";
import { ServiceManager } from "../services/collection";
import { SetDynamicEvents } from "./events";
import { ExtendedLogger } from "../logger/logger";
import { updateSettings } from "./events/on-configuration";
import { ExtensionContext } from "../extension/context";
import { CapabilityBuilder } from "../services/capabilities";
import { CompletionService } from "../completion/service";
import { DocumentManager } from "../documents/manager";
import { DocumentProcessor } from "../process/document-processor";
import { WorkspaceProcessor } from "../process/workspace-processor";
import { PackProcessor } from "../process/pack-processor";
import { DiagnoserService } from "../diagnostics/service";
import { Database } from "../database/database";

export function setupServer() {
  // Create a connection for the server, using Node's IPC as a transport.
  // Also include all preview / proposed LSP features.
  const connection = createConnection(ProposedFeatures.all);

  const logger = new ExtendedLogger(connection.console);
  const documents = new DocumentManager(logger);
  const extension = new ExtensionContext(connection, logger, documents);
  const database = new Database(logger, extension);
  const diagnoserService = new DiagnoserService(logger, extension);
  const documentProcessor = new DocumentProcessor(logger, extension, documents, diagnoserService);
  const packProcessor = new PackProcessor(logger, extension, documentProcessor);
  const workspaceProcessor = new WorkspaceProcessor(logger, extension, packProcessor);
  const manager = new ServiceManager(logger).add(
    documents,
    database,
    diagnoserService,
    documentProcessor,
    packProcessor,
    workspaceProcessor,
    new CompletionService(logger, extension)
  );

  logger.info("starting minecraft server");
  setupHandlers();

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
  });

  // On shutdown handler
  connection.onShutdown(() => {
    logger.info("Shutting down server");
    manager.stop();
  });

  connection.onExit(() => {
    logger.info("exiting server");
    manager.dispose();
  });

  // Listen on the connection
  connection.listen();
}
