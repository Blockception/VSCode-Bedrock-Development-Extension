import { ClientCapabilities, Connection } from "vscode-languageserver";
import { IDocumentManager } from "../documents/manager";
import { IExtendedLogger } from "../logger/logger";
import { Database } from "../database/database";
import { ExtensionCapabilities } from "./capabilities";
import { State } from "./state";
import { Settings } from "./settings";

export interface IExtensionContext {
  capabilities: ExtensionCapabilities;
  connection: Connection;
  database: Database;
  documents: IDocumentManager;
  logger: IExtendedLogger;
  state: State;
  settings: Settings;
}

export class ExtensionContext implements IExtensionContext {
  public capabilities: ExtensionCapabilities;
  public connection: Connection;
  public database: Database;
  public documents: IDocumentManager;
  public logger: IExtendedLogger;
  public state: State;
  public settings: Settings;

  constructor(connection: Connection, logger: IExtendedLogger, documents: IDocumentManager, database: Database) {
    this.capabilities = ExtensionCapabilities.empty();
    this.connection = connection;
    this.database = database;
    this.documents = documents;
    this.logger = logger;
    this.settings = Settings.createDefaultSettings();
    this.state = State.empty();
  }

  parseClientCapabilities(capabilities: ClientCapabilities): void {
    ExtensionCapabilities.parseCapabilities(this.capabilities, capabilities);
  }
}
