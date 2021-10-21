import { OnCommandRequestAsync } from "../../Commands/OnRequest";
import { OnCompletionRequestAsync } from "../../Completion/OnRequest";
import { onDefinitionRequestAsync, onTypeDefinitionRequestAsync } from "../../Definition/OnRequest";
import { OnDocumentFormatRequestAsync, OnDocumentRangeFormatRequestAsync } from "../../Format/OnRequest";
import { OnHoverRequestAsync } from "../../Hover/OnRequest";
import { Manager } from "../../Manager/Manager";
import { OnReferencesRequestAsync } from "../../References/OnRequest";
import { OnSignatureRequestAsync } from "../../Signatures/OnRequest";
import { OnDocumentSymbolRequestAsync, OnWorkspaceSymbolRequestAsync } from "../../Symbols/OnRequest";
import { OndDocumentChangedAsync } from "./Documents";
import { onDidChangeConfigurationAsync } from "../OnConfiguration";
import { OnProvideRangeSemanticRequestAsync, OnProvideSemanticRequestAsync } from "../../Semantics/include";
import { OnDidCreateFilesAsync, onDidDeleteFilesAsync, OnDidRenameFilesAsync, OnWorkspaceFolderChangeAsync } from "./Workspace/include";
import { OnCodeActionAsync, OnCodeActionResolveAsync } from "../../CodeAction/OnRequest";
import { OnCodeLensRequestAsync, OnCodeLensResolveRequestAsync } from "../../CodeLens/OnRequest";
import { OnConfigurationChanged } from '../Settings/Update';

/**
 * Setup the server events
 */
export function setEvents() {
  const Documents = Manager.Documents;
  const Connection = Manager.Connection;

  //Provides diagnostics and such
  Documents.onDidOpen(OndDocumentChangedAsync);
  Documents.onDidSave(OndDocumentChangedAsync); 

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

  if (Manager.Capabiltities.hasWorkspaceFolderCapability) {
    // Workspace event
    Connection.workspace.onDidCreateFiles(OnDidCreateFilesAsync);
    Connection.workspace.onDidDeleteFiles(onDidDeleteFilesAsync);
    Connection.workspace.onDidRenameFiles(OnDidRenameFilesAsync);
    Connection.workspace.onDidChangeWorkspaceFolders(OnWorkspaceFolderChangeAsync);
  }
}
