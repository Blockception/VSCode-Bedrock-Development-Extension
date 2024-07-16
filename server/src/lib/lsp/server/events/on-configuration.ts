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
  UpdateSettings();
}

export function OnConfigurationChanged(params: DidChangeConfigurationParams): void {
  UpdateSettings();
}

export function UpdateSettings(): void {
  const Settings = Manager.Connection.workspace.getConfiguration(Identification.SettingsConfigurationIdentifier);

  //If settings is nothing then skip it.
  if (Settings === undefined || Settings === null) return;

  Settings.then(UpdateSettingsThen);
}

function UpdateSettingsThen(data: any): void {
  Console.Info("Updating settings");

  //If settings is nothing then skip it.
  if (data === undefined || data === null) return;

  const Casted = <ServerSettings>data;

  if (ServerSettings.is(Casted)) {
    Manager.Settings = Casted;

    //Update existing settings
    Database.WorkspaceData.forEach((value, uri) => {
      Database.WorkspaceData.set(uri, GetProject(uri));
    });
  }
}
