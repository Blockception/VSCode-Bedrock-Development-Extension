import { Connection, InitializeParams } from 'vscode-languageserver';
import { IDocumentManager } from '../documents/manager'
import { IExtendedLogger } from '../logger/logger';


export interface ExtensionCapabilities {
  completion: boolean
}

export interface State {
  workspaces: {
    traversed: boolean;
  }
}


export class ExtensionContext {
  public capabilities: ExtensionCapabilities;
  public documents: IDocumentManager;
  public logger: IExtendedLogger;
  public state: State;
  public connection: Connection;

  constructor(connection: Connection, logger: IExtendedLogger, documents: IDocumentManager) {
    this.connection = connection;
    this.documents = documents;
    this.logger = logger;
    this.capabilities = {
      completion: false,
    }
    this.state = {
      workspaces: {
        traversed: false
      }
    };
  }
}