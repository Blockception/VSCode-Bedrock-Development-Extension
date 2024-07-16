import { DidChangeConfigurationParams } from "vscode-languageserver";
import { Identification } from "@blockception/shared";
import { Database } from "../../../database/database";
import { Console } from "../../../manager";
import { Manager } from "../../../manager/manager";
import { GetProject } from "../../../project/mcprojects";
import { ServerSettings } from "../settings";

export async function onDidChangeConfigurationAsync(params: DidChangeConfigurationParams): Promise<void> {
  return Promise.resolve(onDidChangeConfiguration(params));
}

export function onDidChangeConfiguration(params: DidChangeConfigurationParams): void {
  updateSettings();
}

export function onConfigurationChanged(params: DidChangeConfigurationParams): void {
  updateSettings();
}

export function updateSettings(): void {
  const Settings = Manager.Connection.workspace.getConfiguration(Identification.SettingsConfigurationIdentifier);

  //If settings is nothing then skip it.
  if (Settings === undefined || Settings === null) return;

  Settings.then(updateSettingsObject);
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
