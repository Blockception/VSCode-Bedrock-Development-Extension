/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { createConnection, ProposedFeatures, InitializeParams, CompletionItem, TextDocumentPositionParams, TextDocumentSyncKind, InitializeResult, DocumentSymbolParams, SymbolInformation, WorkspaceChange, WorkspaceFoldersRequest, DidChangeConfigurationNotification, DidOpenTextDocumentNotification, VersionedTextDocumentIdentifier, ConnectionStrategy, Files, TextDocuments } from 'vscode-languageserver';
import { Manager } from './Manager';
import { TraveseDirectory } from './traverse';
import { URI } from 'vscode-uri';
import { Process } from './Process';

console.log('starting minecraft server');

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);

Manager.Documents.onDidOpen(x => Process(x.document));
Manager.Documents.onDidSave(x => Process(x.document));

// This handler provides completion items.
//connection.onCompletion(OnCompletionRequest);

// This handler provides document symbols
//connection.onDocumentSymbol(OnDocumentSymbolRequest);

// This handler provides workspace symbols
//connection.onWorkspaceSymbol(OnWorkspaceSymbolRequest);


connection.onInitialized(() => {
	console.log('Initialized minecraft server');

	if (Manager.hasConfigurationCapability) {
		// Register for all configuration changes.
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}
	if (Manager.hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			console.log('Workspace folder change event received.');
		});
	}

	console.log('Looping over workspaces folders');
	connection.workspace.getWorkspaceFolders().then(WorkFolders => {
		if (!WorkFolders)
			return;

		console.log('Workspace: ' + WorkFolders.length);
		WorkFolders?.forEach(folders => {
			console.log('Workspace: ' + folders.name);

			var Path = URI.parse(folders.uri).fsPath;

			if (Path == undefined)
				return;

			TraveseDirectory(Path);
			Manager.TraversedWorkspaces = true;
		});
	});
});

//Initialize
connection.onInitialize((params: InitializeParams) => {
	console.log('Initializing minecraft server');
	let capabilities = params.capabilities;

	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	Manager.hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	Manager.hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);
	Manager.hasDiagnosticRelatedInformationCapability = !!(
		capabilities.textDocument &&
		capabilities.textDocument.publishDiagnostics &&
		capabilities.textDocument.publishDiagnostics.relatedInformation
	);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			// Tell the client that this server supports code completion.
			completionProvider: {
				resolveProvider: true
			},
			documentSymbolProvider: true,
			workspaceSymbolProvider: true
		}
	};
	if (Manager.hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
		};
	}
	return result;
});

//Initialize server
Manager.Documents.listen(connection);

// Listen on the connection
connection.listen();
