import { DidChangeConfigurationParams } from "vscode-languageserver/node";
import { Identification } from "../Constants";
import { Manager } from "../Manager/Manager";

export interface ServerSettings {
  Education: {
    Enable: boolean;
  };
  Diagnostics: {
    Lang: boolean;
    Json: boolean;
    Mcfunctions: boolean;
    Objectives: boolean;
    Tags: boolean;
  };
}

export namespace ServerSettings {
  export function is(value: any): value is ServerSettings {
    if (value) {
      let temp = <ServerSettings>value;

      if (temp.Education && temp.Diagnostics) {
        if (typeof temp.Education.Enable !== "boolean") return false;

        if (typeof temp.Diagnostics.Lang !== "boolean") return false;
        if (typeof temp.Diagnostics.Json !== "boolean") return false;
        if (typeof temp.Diagnostics.Mcfunctions !== "boolean") return false;
        if (typeof temp.Diagnostics.Objectives !== "boolean") return false;
        if (typeof temp.Diagnostics.Tags !== "boolean") return false;

        return true;
      }
    }

    return false;
  }

  export function createDefaulSettings(): ServerSettings {
    let Out: ServerSettings = {
      Education: {
        Enable: true,
      },
      Diagnostics: {
        Lang: true,
        Json: true,
        Mcfunctions: true,
        Objectives: true,
        Tags: true,
      },
    };

    return Out;
  }
}

export function OnConfigurationChanged(params: DidChangeConfigurationParams): void {
  UpdateSettings();
}

export function UpdateSettings(): void {
  let Settings = Manager.Connection.workspace.getConfiguration(Identification.SettingsConfigurationIdentifier);

  //If settings is nothing then skip it.
  if (Settings === undefined || Settings === null) return;

  Settings.then(UpdateSettingsThen);
}

function UpdateSettingsThen(data: any): void {
  //If settings is nothing then skip it.
  if (data === undefined || data === null) return;

  let Casted = <ServerSettings>data;

  if (ServerSettings.is(Casted)) {
    Manager.Settings = Casted;
  }
}
