import { onCommandRequestAsync } from "../../commands/on-request";
import { onDefinitionRequestAsync, onTypeDefinitionRequestAsync } from "../../references/on-definitions";
import { OnDocumentSymbolRequestAsync, OnWorkspaceSymbolRequestAsync } from "../../symbols/on-request";
import { onImplementationRequestAsync } from "../../references/on-implementation";
import { onProvideSemanticRequestAsync, onProvideRangeSemanticRequestAsync } from "../../semantics/on-request";
import { onReferencesRequestAsync } from "../../references/on-request";
import { OnSignatureRequestAsync } from "../../signatures/on-request";
import { Connection } from 'vscode-languageserver';

/**
 * Setup the server events
 */
export function setupHandlers(connection: Connection) {

  // This handler provides commands
  connection.onExecuteCommand(onCommandRequestAsync);

  // This handler provides code actions


  // This handler provides code lens

  // This handler provides go to definitions
  connection.onDefinition(onDefinitionRequestAsync);
  connection.onTypeDefinition(onTypeDefinitionRequestAsync);
  connection.onImplementation(onImplementationRequestAsync);

  // This handler provides formatting

  // This handler provides document/workspace symbols
  connection.onDocumentSymbol(OnDocumentSymbolRequestAsync);
  connection.onWorkspaceSymbol(OnWorkspaceSymbolRequestAsync);

  // This handler provides references
  connection.onReferences(onReferencesRequestAsync);

  // This handler provides signatures
  connection.onSignatureHelp(OnSignatureRequestAsync);

  // This handler provides semantic Tokens
  connection.languages.semanticTokens.on(onProvideSemanticRequestAsync);
  connection.languages.semanticTokens.onRange(onProvideRangeSemanticRequestAsync);
}
