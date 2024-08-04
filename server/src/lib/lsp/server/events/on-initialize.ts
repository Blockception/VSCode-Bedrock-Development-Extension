import { InitializeParams, InitializeResult } from "vscode-languageserver";
import { Version } from "../../../constants/version";

const triggerCharacters = toArray(" abcdefghijklmnopqrstuvwxyz[]{}:.@=+-*/\\|!#$%^&*()<>?,'\"");

export function onInitialize(params: InitializeParams): InitializeResult {


  const result: InitializeResult = {
    serverInfo: {
      name: "bc-minecraft-language-server",
      version: Version,
    },
    capabilities: {

      typeDefinitionProvider: true,

      // Tell the client that this server supports symbol provider
      documentSymbolProvider: true,
      workspaceSymbolProvider: true,


      // Tell the client that this server supports signatures
      signatureHelpProvider: {
        triggerCharacters: triggerCharacters,
        retriggerCharacters: triggerCharacters,
        workDoneProgress: true,
      },
    },
  };

  return result;
}


function toArray(value: string): string[] {
  const out : string[] = [];

  for (let i = 0; i < value.length; i++) {
    out.push(value[i]);
  }

  return out;
}
