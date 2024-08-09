import { ClientCapabilities, Connection } from "vscode-languageserver";
import { IDocumentManager } from "../documents/manager";
import { IExtendedLogger } from "../logger/logger";
import { Database } from "../database/database";
import { ExtensionCapabilities } from "./capabilities";
import { State } from "./state";
import { Settings } from "./settings";
import { ServiceManager } from "../services/collection";

export interface IExtensionContext {
  capabilities: ExtensionCapabilities;
  connection: Connection;
  database: Database;
  documents: IDocumentManager;
  logger: IExtendedLogger;
  state: State;
  settings: Settings;
  services: ServiceManager;
}

export class ExtensionContext implements IExtensionContext {
  public capabilities: ExtensionCapabilities;
  public connection: Connection;
  public database: Database;
  public documents: IDocumentManager;
  public logger: IExtendedLogger;
  public services: ServiceManager;
  public settings: Settings;
  public state: State;

  constructor(
    connection: Connection,
    services: ServiceManager,
    logger: IExtendedLogger,
    documents: IDocumentManager,
    database: Database
  ) {
    this.capabilities = ExtensionCapabilities.empty();
    this.connection = connection;
    this.database = database;
    this.documents = documents;
    this.logger = logger;
    this.services = services;
    this.settings = Settings.createDefaultSettings();
    this.state = State.empty();
  }

  parseClientCapabilities(capabilities: ClientCapabilities): void {
    ExtensionCapabilities.parseCapabilities(this.capabilities, capabilities);
  }
}
