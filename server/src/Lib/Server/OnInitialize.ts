import { InitializeParams, InitializeResult, TextDocumentSyncKind } from "vscode-languageserver";
import { Manager } from "../Manager/Manager";
import { Commands } from "../Constants";
import { Console } from "../Manager/Console";

export async function onInitializeAsync(params: InitializeParams): Promise<InitializeResult> {
  return new Promise<InitializeResult>((resolve, reject) => {
    resolve(onInitialize(params));
  });
}

export function onInitialize(params: InitializeParams): InitializeResult {
  Console.Log("Initializing minecraft server");

  //process capabilities of the client
  let capabilities = params.capabilities;
  Manager.Capabiltities.Parse(capabilities);

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,

      // Tell the client that this server supports a couple commands
      executeCommandProvider: {
        commands: [Commands.DiagnoseProject, Commands.MCProject.Create, Commands.Files.Append, Commands.ScanProjects, Commands.StoreProject],
        workDoneProgress: true,
      },

      // Code Actions
      codeActionProvider: true,
      codeLensProvider: {
        resolveProvider: true,
        workDoneProgress: false,
      },

      // Tell the client that this server supports go to defintitions
      definitionProvider: true,
      typeDefinitionProvider: true,

      // Tell the client that this server supports symbol provider
      documentSymbolProvider: true,
      workspaceSymbolProvider: true,

      // Tell the client that this server supports hover support
      hoverProvider: true,

      // Tell the client that this server supports code completion.
      completionProvider: {
        resolveProvider: false,
        triggerCharacters: [" ", "\t", "[", "=", ",", "."],
      },

      // Tell the client that this server supports go to references
      referencesProvider: {
        workDoneProgress: true,
      },

      // Tell the client that this server supports signatures
      signatureHelpProvider: {
        triggerCharacters: [" "],
        retriggerCharacters: [" ", "\t"],
        workDoneProgress: true,
      },

      workspace: {
        workspaceFolders: {
          changeNotifications: true,
          supported: true,
        },
      },
    },
    serverInfo: {
      name: "BC-minecraft-language-server",
    },
  };

  if (Manager.Capabiltities.hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true,
        changeNotifications: true,
      },
      //Todo fill in filters
      fileOperations: {
        didCreate: { filters: [] },
        didDelete: { filters: [] },
        didRename: { filters: [] },
      },
    };
  }

  return result;
}
