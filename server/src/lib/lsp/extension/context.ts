import { Connection, InitializeParams } from "vscode-languageserver";
import { IDocumentManager } from "../documents/manager";
import { IExtendedLogger } from "../logger/logger";
import { Database } from "../database/database";

export interface ExtensionCapabilities {
  completion: boolean;
}

export interface State {
  workspaces: {
    traversed: boolean;
  };
}

export class ExtensionContext {
  public capabilities: ExtensionCapabilities;
  public connection: Connection;
  public database: Database;
  public documents: IDocumentManager;
  public logger: IExtendedLogger;
  public state: State;

  constructor(connection: Connection, logger: IExtendedLogger, documents: IDocumentManager, database: Database) {
    this.connection = connection;
    this.database = database;
    this.documents = documents;
    this.logger = logger;
    this.capabilities = {
      completion: false,
    };
    this.state = {
      workspaces: {
        traversed: false,
      },
    };
  }
}
