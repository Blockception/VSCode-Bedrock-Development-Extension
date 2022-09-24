import { Manager } from "../../Manager/Manager";
import { OnCodeActionAsync, OnCodeActionResolveAsync } from "../../CodeAction/OnRequest";
import { OnCodeLensRequestAsync, OnCodeLensResolveRequestAsync } from "../../CodeLens/OnRequest";
import { OnCommandRequestAsync } from "../../Commands/OnRequest";
import { OnCompletionRequestAsync } from "../../Completion/OnRequest";
import { OnConfigurationChanged } from '../Settings/Update';
import { onDefinitionRequestAsync, onTypeDefinitionRequestAsync } from "../../Definition/OnRequest";
import { onDidChangeConfigurationAsync } from "../OnConfiguration";
import { OnDidCreateFilesAsync, onDidDeleteFilesAsync, OnDidRenameFilesAsync, OnWorkspaceFolderChangeAsync } from "./Workspace";
import { OnDocumentChangedAsync } from "./Documents";
import { OnDocumentFormatRequestAsync, OnDocumentRangeFormatRequestAsync } from "../../Format/OnRequest";
import { OnDocumentSymbolRequestAsync, OnWorkspaceSymbolRequestAsync } from "../../Symbols/OnRequest";
import { OnHoverRequestAsync } from "../../Hover/OnRequest";
import { onImplementationRequestAsync } from '../../Implementation/OnRequest';
import { OnProvideRangeSemanticRequestAsync, OnProvideSemanticRequestAsync } from "../../Semantics";
import { OnReferencesRequestAsync } from "../../References/OnRequest";
import { OnSignatureRequestAsync } from "../../Signatures/OnRequest";

/**
 * Setup the server events
 */
export function setEvents() {
  const Documents = Manager.Documents;
  const Connection = Manager.Connection;

  //Provides diagnostics and such
  Documents.onDidOpen(OnDocumentChangedAsync);
  Documents.onDidSave(OnDocumentChangedAsync);

  // This handler provides commands
  Connection.onExecuteCommand(OnCommandRequestAsync);

  // This handler provides code actions
  Connection.onCodeAction(OnCodeActionAsync);
  Connection.onCodeActionResolve(OnCodeActionResolveAsync);

  // This handler provides code lens
  Connection.onCodeLens(OnCodeLensRequestAsync);
  Connection.onCodeLensResolve(OnCodeLensResolveRequestAsync)

  // This handler provides completion items.
  Connection.onCompletion(OnCompletionRequestAsync);
  //Connection.onCompletionResolve(OnCompletionResolveRequestAsync);
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
  Connection.onHover(OnHoverRequestAsync);

  // This handler provides references
  Connection.onReferences(OnReferencesRequestAsync);

  // This handler provides signatures
  Connection.onSignatureHelp(OnSignatureRequestAsync);

  //Settings changed
  Connection.onDidChangeConfiguration(OnConfigurationChanged);

  // This handler provides semantic Tokens
  Connection.languages.semanticTokens.on(OnProvideSemanticRequestAsync);
  Connection.languages.semanticTokens.onRange(OnProvideRangeSemanticRequestAsync);

  if (Manager.Capabilities.hasWorkspaceFolderCapability) {
    // Workspace event
    Connection.workspace.onDidCreateFiles(OnDidCreateFilesAsync);
    Connection.workspace.onDidDeleteFiles(onDidDeleteFilesAsync);
    Connection.workspace.onDidRenameFiles(OnDidRenameFilesAsync);
    Connection.workspace.onDidChangeWorkspaceFolders(OnWorkspaceFolderChangeAsync);
  }
}