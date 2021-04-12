import { DidChangeConfigurationParams } from "vscode-languageserver";
import { UpdateSettings } from "./Settings";

export async function onDidChangeConfigurationAsync(params: DidChangeConfigurationParams): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    onDidChangeConfiguration(params);
    resolve();
  });
}

export function onDidChangeConfiguration(params: DidChangeConfigurationParams): void {
  UpdateSettings();
}
