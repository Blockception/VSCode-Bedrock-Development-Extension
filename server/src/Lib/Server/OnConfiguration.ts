import { DidChangeConfigurationParams } from "vscode-languageserver";
import { UpdateSettings } from "./Settings/Update";

export async function onDidChangeConfigurationAsync(params: DidChangeConfigurationParams): Promise<void> {
  return Promise.resolve(onDidChangeConfiguration(params));
}

export function onDidChangeConfiguration(params: DidChangeConfigurationParams): void {
  UpdateSettings();
}
