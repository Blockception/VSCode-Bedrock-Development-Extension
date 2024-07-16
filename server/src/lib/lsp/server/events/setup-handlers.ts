import { Manager } from "../../../manager/manager";
import { onCodeActionAsync, onCodeActionResolveAsync } from "../../../code-action/on-request";
import { OnCodeLensRequest } from "../../../code-lens/on-request";
import { OnCommandRequestAsync } from "../../commands/on-request";
import { onCompletionRequestAsync } from "../../completion/on-request";
import { OnConfigurationChanged, onDidChangeConfigurationAsync } from "./on-configuration";
import { onDefinitionRequestAsync, onTypeDefinitionRequestAsync } from "../../references/on-definitions";
import { OnDocumentChangedAsync } from "./on-documents";
import { OnDocumentFormatRequestAsync, OnDocumentRangeFormatRequestAsync } from "../../../format/on-request";
import { OnDocumentSymbolRequestAsync, OnWorkspaceSymbolRequestAsync } from "../../symbols/on-request";
import { onHoverRequestAsync } from "../../hover/on-request";
import { onImplementationRequestAsync } from "../../references/on-implementation";
import { onProvideSemanticRequestAsync, onProvideRangeSemanticRequestAsync } from "../../semantics/on-request";
import { onReferencesRequestAsync } from "../../references/on-request";
import { OnSignatureRequestAsync } from "../../signatures/on-request";
import {
  OnDidCreateFilesAsync,
  onDidDeleteFilesAsync,
  OnDidRenameFilesAsync,
  OnWorkspaceFolderChangeAsync,
} from "./workspace-events";

/**
 * Setup the server events
 */
export function setupHandlers() {
  const Documents = Manager.Documents;
  const Connection = Manager.Connection;

  //provides diagnostics and such
  Documents.onDidOpen(OnDocumentChangedAsync);
  Documents.onDidSave(OnDocumentChangedAsync);

  // This handler provides commands
  Connection.onExecuteCommand(OnCommandRequestAsync);

  // This handler provides code actions
  Connection.onCodeAction(onCodeActionAsync);
  Connection.onCodeActionResolve(onCodeActionResolveAsync);

  // This handler provides code lens
  Connection.onCodeLens(OnCodeLensRequest);

  // This handler provides completion items.
  Connection.onCompletion(onCompletionRequestAsync);
  //Connection.onCompletionResolve(onCompletionResolveRequestAsync);
  Connection.onImplementation(onImplementationRequestAsync);

  // This handler provides go to definitions
  Connection.onDefinition(onDefinitionRequestAsync);
  Connection.onTypeDefinition(onTypeDefinitionRequestAsync);

  // This handler provides formatting
  Connection.onDocumentFormatting(OnDocumentFormatRequestAsync);
  Connection.onDocumentRangeFormatting(OnDocumentRangeFormatRequestAsync);

  // This handler provides document/workspace symbols
  Connection.onDocumentSymbol(OnDocumentSymbolRequestAsync);
  Connection.onWorkspaceSymbol(OnWorkspaceSymbolRequestAsync);

  // This handler provides support for when a configuration changes
  Connection.onDidChangeConfiguration(onDidChangeConfigurationAsync);

  // This handler provides hover support
  Connection.onHover(onHoverRequestAsync);

  // This handler provides references
  Connection.onReferences(onReferencesRequestAsync);

  // This handler provides signatures
  Connection.onSignatureHelp(OnSignatureRequestAsync);

  //Settings changed
  Connection.onDidChangeConfiguration(OnConfigurationChanged);

  // This handler provides semantic Tokens
  Connection.languages.semanticTokens.on(onProvideSemanticRequestAsync);
  Connection.languages.semanticTokens.onRange(onProvideRangeSemanticRequestAsync);

  if (Manager.Capabilities.hasWorkspaceFolderCapability) {
    // Workspace event
    Connection.workspace.onDidCreateFiles(OnDidCreateFilesAsync);
    Connection.workspace.onDidDeleteFiles(onDidDeleteFilesAsync);
    Connection.workspace.onDidRenameFiles(OnDidRenameFilesAsync);
    Connection.workspace.onDidChangeWorkspaceFolders(OnWorkspaceFolderChangeAsync);
  }
}
