import { OnDocumentSymbolRequestAsync, OnWorkspaceSymbolRequestAsync } from "../../symbols/on-request";
import { Connection } from 'vscode-languageserver';

/**
 * Setup the server events
 */
export function setupHandlers(connection: Connection) {


  // This handler provides formatting

  // This handler provides document/workspace symbols
  connection.onDocumentSymbol(OnDocumentSymbolRequestAsync);
  connection.onWorkspaceSymbol(OnWorkspaceSymbolRequestAsync);
}
