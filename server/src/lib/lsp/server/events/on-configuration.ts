import { Console } from "../../../manager";
import { Database } from "../../../lsp/database/database";
import { DidChangeConfigurationParams } from "vscode-languageserver";
import { GetProject } from "../../../project/mcprojects";
import { Identification } from "@blockception/shared";
import { Manager } from "../../../manager/manager";
import { ServerSettings } from "../settings";

export async function onDidChangeConfigurationAsync(params: DidChangeConfigurationParams): Promise<void> {
  onDidChangeConfiguration(params);
}

export function onDidChangeConfiguration(params: DidChangeConfigurationParams): void {
  Console.Info("onDidChangeConfiguration: " + JSON.stringify(params, undefined, 2));
  updateSettings();
}

export function onConfigurationChanged(params: DidChangeConfigurationParams): void {
  Console.Info("onConfigurationChanged: " + JSON.stringify(params, undefined, 2));
  updateSettings();
}

export function updateSettings(): void {
  const settings = Manager.Connection.workspace.getConfiguration(Identification.SettingsConfigurationIdentifier);

  //If settings is nothing then skip it.
  if (settings === undefined || settings === null) return;

  settings.then(updateSettingsObject);
}

function updateSettingsObject(data: any): void {
  Console.Info("Updating settings");

  //If settings is nothing then skip it.
  if (data === undefined || data === null) return;

  const casted = data as ServerSettings;

  if (ServerSettings.is(casted)) {
    Manager.Settings = casted;

    //Update existing settings
    Database.WorkspaceData.forEach((value, uri) => {
      Database.WorkspaceData.set(uri, GetProject(uri));
    });
  }
}
