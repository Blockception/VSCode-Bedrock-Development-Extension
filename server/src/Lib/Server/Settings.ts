import { MCProject } from "bc-minecraft-project";
import { DidChangeConfigurationParams } from "vscode-languageserver/node";
import { Identification } from "../Constants";
import { Database } from "../Database/Database";
import { Manager } from "../Manager/Manager";

/**
 *
 */
export interface ServerSettings {
  Education: {
    Enable: boolean;
  };
  Diagnostics: {
    Enable: boolean;
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
      const temp = <ServerSettings>value;

      if (temp.Education && temp.Diagnostics) {
        if (typeof temp.Education.Enable !== "boolean") return false;

        if (typeof temp.Diagnostics.Enable !== "boolean") return false;
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

  /**
   *
   * @param value
   * @returns
   */
  export function clone(value: ServerSettings): ServerSettings {
    return {
      Education: {
        Enable: value.Education.Enable,
      },
      Diagnostics: {
        Enable: value.Diagnostics.Enable,
        Lang: value.Diagnostics.Lang,
        Json: value.Diagnostics.Json,
        Mcfunctions: value.Diagnostics.Mcfunctions,
        Objectives: value.Diagnostics.Objectives,
        Tags: value.Diagnostics.Tags,
      },
    };
  }

  export function createDefaulSettings(): ServerSettings {
    const Out: ServerSettings = {
      Education: {
        Enable: true,
      },
      Diagnostics: {
        Enable: true,
        Lang: true,
        Json: true,
        Mcfunctions: true,
        Objectives: true,
        Tags: true,
      },
    };

    return Out;
  }

  /**
   *
   * @returns
   */
  export function clonedSettings(): ServerSettings {
    return clone(Manager.Settings);
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

  const Casted = <ServerSettings>data;

  if (ServerSettings.is(Casted)) {
    Manager.Settings = Casted;

    //Update existing settings
    Database.WorkspaceData.forEach((value) => Overlay(value));
  }
}

export function Overlay(project: MCProject): MCProject {
  const settings = Manager.Settings;

  OverLaySetIf(project, "education.enable", `${settings.Education.Enable}`);
  OverLaySetIf(project, "diagnostic.enable", `${settings.Diagnostics.Enable}`);
  OverLaySetIf(project, "diagnostic.lang", `${settings.Diagnostics.Lang}`);
  OverLaySetIf(project, "diagnostic.json", `${settings.Diagnostics.Json}`);
  OverLaySetIf(project, "diagnostic.mcfunction", `${settings.Diagnostics.Mcfunctions}`);
  OverLaySetIf(project, "diagnostic.objectives", `${settings.Diagnostics.Objectives}`);
  OverLaySetIf(project, "diagnostic.tags", `${settings.Diagnostics.Tags}`);

  return project;
}

function OverLaySetIf(project: MCProject, key: string, value: string) {
  if (project.attributes[key] === undefined) project.attributes[key] = value;
}
