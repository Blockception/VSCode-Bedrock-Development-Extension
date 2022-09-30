import { InitializeParams, InitializeResult, TextDocumentSyncKind } from "vscode-languageserver";
import { Manager } from "../Manager/Manager";
import { Commands, Languages } from "../Constants";
import { Console } from "../Manager/Console";
import { Version } from '../Version';


export async function onInitializeAsync(params: InitializeParams): Promise<InitializeResult> {
  return Promise.resolve(onInitialize(params));
}

export function onInitialize(params: InitializeParams): InitializeResult {
  Console.Info("Initializing minecraft server");

  //process capabilities of the client
  const capabilities = params.capabilities;
  Manager.Capabilities.Parse(capabilities);

  const result: InitializeResult = {
    serverInfo: {
      name: "bc-minecraft-language-server",
      version: Version,
    },
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,

      // Tell the client that this server supports a couple commands
      executeCommandProvider: {
        commands: [
          Commands.DiagnoseProject,
          Commands.MCProject.Create,
          Commands.Files.Append,
          Commands.ScanProjects,
          Commands.StoreProject,
        ],
        workDoneProgress: true,
      },

      // Code Actions
      codeActionProvider: true,
      codeLensProvider: {
        resolveProvider: true,
        workDoneProgress: false,
      },

      // Tell the client that this server supports go to definitions
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
        triggerCharacters: [" ", "\t", "[", "=", ",", ".", "/", "@", "\n", "{"],
        //allCommitCharacters: ["\t", "=", ",", ".", "/"]
      },

      // Tell the client that this server supports go to references
      referencesProvider: {
        workDoneProgress: true,
      },

      // Tell the client that this server supports go to implementation
      implementationProvider: {
        documentSelector: [
          { language: Languages.JsonCIdentifier },
          { language: Languages.JsonIdentifier },
          { language: Languages.McFunctionIdentifier },
          { language: Languages.McLanguageIdentifier },
          { language: Languages.McMolangIdentifier },
          { language: Languages.McOtherIdentifier },
          { language: Languages.McProjectIdentifier },
        ],
      },

      // Tell the client that this server supports signatures
      signatureHelpProvider: {
        triggerCharacters: [" ", "\t", "@", "/", '"', "'", "."],
        retriggerCharacters: [" ", "\t", "@", "/", '"', "'", "."],
        workDoneProgress: true,
      },

      //Workspace settings
      workspace: {
        workspaceFolders: {
          changeNotifications: true,
          supported: true,
        },
        fileOperations: {
          didCreate: { filters: [{ scheme: "file", pattern: { glob: "**​/*.{mcfunction,json}" } }] },
          didDelete: { filters: [{ scheme: "file", pattern: { glob: "**​/*.{mcfunction,json}" } }] },
          didRename: { filters: [{ scheme: "file", pattern: { glob: "**​/*.{mcfunction,json}" } }] },
        },
      },
    },
  };

  return result;
}
