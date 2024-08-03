import { Manager } from "../../../manager/manager";
import { onCodeLensRequest } from "../../code-lens";
import { onCommandRequestAsync } from "../../commands/on-request";
import { onConfigurationChanged, onDidChangeConfigurationAsync } from "./on-configuration";
import { onDefinitionRequestAsync, onTypeDefinitionRequestAsync } from "../../references/on-definitions";
import { OnDocumentFormatRequestAsync, OnDocumentRangeFormatRequestAsync } from "../../format/on-request";
import { OnDocumentSymbolRequestAsync, OnWorkspaceSymbolRequestAsync } from "../../symbols/on-request";
import { onImplementationRequestAsync } from "../../references/on-implementation";
import { onProvideSemanticRequestAsync, onProvideRangeSemanticRequestAsync } from "../../semantics/on-request";
import { onReferencesRequestAsync } from "../../references/on-request";
import { OnSignatureRequestAsync } from "../../signatures/on-request";

/**
 * Setup the server events
 */
export function setupHandlers() {
  const Connection = Manager.Connection;



  // This handler provides commands
  Connection.onExecuteCommand(onCommandRequestAsync);

  // This handler provides code actions


  // This handler provides code lens
  Connection.onCodeLens(onCodeLensRequest);

  // This handler provides go to definitions
  Connection.onDefinition(onDefinitionRequestAsync);
  Connection.onTypeDefinition(onTypeDefinitionRequestAsync);
  Connection.onImplementation(onImplementationRequestAsync);

  // This handler provides formatting
  Connection.onDocumentFormatting(OnDocumentFormatRequestAsync);
  Connection.onDocumentRangeFormatting(OnDocumentRangeFormatRequestAsync);

  // This handler provides document/workspace symbols
  Connection.onDocumentSymbol(OnDocumentSymbolRequestAsync);
  Connection.onWorkspaceSymbol(OnWorkspaceSymbolRequestAsync);

  // This handler provides support for when a configuration changes
  Connection.onDidChangeConfiguration(onDidChangeConfigurationAsync);



  // This handler provides references
  Connection.onReferences(onReferencesRequestAsync);

  // This handler provides signatures
  Connection.onSignatureHelp(OnSignatureRequestAsync);

  //Settings changed
  Connection.onDidChangeConfiguration(onConfigurationChanged);

  // This handler provides semantic Tokens
  Connection.languages.semanticTokens.on(onProvideSemanticRequestAsync);
  Connection.languages.semanticTokens.onRange(onProvideRangeSemanticRequestAsync);

  if (Manager.Capabilities.hasWorkspaceFolderCapability) {
    // Workspace event

  }
}
