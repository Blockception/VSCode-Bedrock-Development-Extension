import { BulkRegistration, createConnection, ProposedFeatures } from "vscode-languageserver/node";
import { setupHandlers } from "./events/setup-handlers";
import { onInitialize } from "./events/on-initialize";
import { ServiceManager } from "../services/collection";
import { SetDynamicEvents } from "./events";
import { ExtendedLogger } from "../logger/logger";
import { ExtensionContext } from "../extension/context";
import { CapabilityBuilder } from "../services/capabilities";
import { CompletionService } from "../completion/service";
import { DocumentManager, IDocumentManager } from "../documents/manager";
import { DocumentProcessor } from "../process/document-processor";
import { WorkspaceProcessor } from "../process/workspace-processor";
import { PackProcessor } from "../process/pack-processor";
import { DiagnoserService } from "../diagnostics/service";
import { Database } from "../database/database";
import { FormatService } from "../format/service";
import { CodeActionService } from "../code-action/service";
import { CodeLensService } from "../code-lens/service";
import { ConfigurationService } from "../configuration/service";
import { Version } from "../../constants/version";
import { CommandService } from "../commands/service";

export function setupServer() {
  // Create a connection for the server, using Node's IPC as a transport.
  // Also include all preview / proposed LSP features.
  const connection = createConnection(ProposedFeatures.all);

  const logger = new ExtendedLogger(connection.console);
  const manager = new ServiceManager(logger);
  const extension = new ExtensionContext(connection, manager, logger, {} as IDocumentManager, {} as Database);
  const documents = new DocumentManager(logger, extension);
  const database = new Database(logger, documents);
  extension.documents = documents;
  extension.database = database;

  const diagnoserService = new DiagnoserService(logger, extension);
  const documentProcessor = new DocumentProcessor(logger, extension, diagnoserService);
  const packProcessor = new PackProcessor(logger, extension, documentProcessor);
  const workspaceProcessor = new WorkspaceProcessor(logger, extension, packProcessor);

  manager
    // Essentials
    .add(new ConfigurationService(logger, extension), documents, database)
    // Non Essentials
    .add(
      diagnoserService,
      documentProcessor,
      packProcessor,
      workspaceProcessor,
      new CodeActionService(logger, extension),
      new CodeLensService(logger, extension),
      new CommandService(logger, extension),
      new CompletionService(logger, extension),
      new FormatService(logger, extension)
    );

  logger.info("starting minecraft server");
  setupHandlers(connection);

  //Initialize
  connection.onInitialize((params) => {
    logger.info("Initializing minecraft server", { version: Version });

    extension.parseClientCapabilities(params.capabilities);

    const result = onInitialize(params);
    const builder = new CapabilityBuilder(result.capabilities);
    manager.onInitialize(builder, params, connection);
    result.capabilities = builder.result();
    return result;
  });

  // This handler provides diagnostics
  connection.onInitialized(async (params) => {
    logger.info("Initialized minecraft server", { version: Version });

    //Registers any follow ups
    const register = BulkRegistration.create();
    SetDynamicEvents(register);
    manager.dynamicRegister(register);
    await connection.client.register(register);

    return manager.start();
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
