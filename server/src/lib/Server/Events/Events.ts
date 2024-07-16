import { Manager } from "../../Manager/Manager";
import { onCodeActionAsync, onCodeActionResolveAsync } from "../../code-action/on-request";
import { OnCodeLensRequest } from "../../CodeLens/OnRequest";
import { OnCommandRequestAsync } from "../../Commands/OnRequest";
import { onCompletionRequestAsync } from "../../completion/on-request";
import { OnConfigurationChanged } from '../Settings/Update';
import { onDefinitionRequestAsync, onTypeDefinitionRequestAsync } from "../../definition/on-request";
import { onDidChangeConfigurationAsync } from "../OnConfiguration";
import { OnDidCreateFilesAsync, onDidDeleteFilesAsync, OnDidRenameFilesAsync, OnWorkspaceFolderChangeAsync } from "./Workspace";
import { OnDocumentChangedAsync } from "./Documents";
import { OnDocumentFormatRequestAsync, OnDocumentRangeFormatRequestAsync } from "../../Format/OnRequest";
import { OnDocumentSymbolRequestAsync, OnWorkspaceSymbolRequestAsync } from "../../symbols/on-request";
import { onHoverRequestAsync } from "../../hover/on-request";
import { onImplementationRequestAsync } from '../../implementation/on-request';
import { onProvideRangeSemanticRequestAsync, onProvideSemanticRequestAsync } from "../../semantics";
import { onReferencesRequestAsync } from "../../references/on-request";
import { OnSignatureRequestAsync } from "../../signatures/OnRequest";

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