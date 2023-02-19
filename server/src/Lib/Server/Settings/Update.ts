import { DidChangeConfigurationParams } from "vscode-languageserver";
import { Identification } from "../../../../../shared/src";
import { Database } from "../../Database/Database";
import { Console } from "../../Manager";
import { Manager } from "../../Manager/Manager";
import { GetProject } from "../../Project/MCProjects";
import { ServerSettings } from "./Settings";

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
