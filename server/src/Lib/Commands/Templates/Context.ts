import { ProjectFiles } from "../../Code/ProjectFiles";
import { Database } from "../../Database/include";
import { Manager } from "../../Manager/Manager";

export interface Context {
  BehaviorPack: string;
  ResourcePack: string;
  WorldFolder: string;
  WorkFolder: string;
}

export function GetContext(): Context | undefined {
  const Data = Database.MinecraftProgramData.GetProjecData();
  if (Data === undefined) return undefined;

  return Convert(Data);
}

export function GetContextAsync<T>(data: T, callback: (c: Context, data: T) => void): void {
  Database.MinecraftProgramData.GetProjecData((projectData) => {
    const Context = Convert(projectData);

    if (Context) callback(Context, data);
  });
}

function Convert(Data: ProjectFiles): Context | undefined {
  let Base: string | undefined;

  //Some assembly required
  if (Data.ResourcePackFolders.length === 0 || Data.BehaviourPackFolders.length === 0) {
    if (Data.WorldFolders.length > 0) {
      Base = Data.WorldFolders[0];
    } else if (Data.Workspaces.length > 0) {
      Base = decodeURI(Data.Workspaces[0]);
    }
  } else if (Data.Workspaces.length > 0) {
    Base = decodeURI(Data.Workspaces[0]);
  }

  let WP: string | undefined;
  let BP: string | undefined;
  let RP: string | undefined;

  if (Data.WorldFolders.length > 0) {
    WP = Data.WorldFolders[0];
  }
  if (Data.BehaviourPackFolders.length > 0) {
    BP = Data.BehaviourPackFolders[0];
  }
  if (Data.ResourcePackFolders.length > 0) {
    RP = Data.ResourcePackFolders[0];
  }

  if (Base === undefined) {
    if (BP === undefined || RP === undefined || WP === undefined) {
      Manager.Connection.window.showErrorMessage("Cannot get context on either: workspace, behavior pack, resourcepack or world");

      return undefined;
    }

    Base = "";
  }

  if (!Base.endsWith("/")) {
    Base += "/";
  }

  if (WP === undefined) {
    WP = Base;
  }

  if (BP === undefined) {
    BP = Base + "behavior_packs/missing_BP/";
  }
  if (RP === undefined) {
    RP = Base + "resource_packs/missing_RP/";
  }

  const Context: Context = { BehaviorPack: BP, ResourcePack: RP, WorldFolder: WP, WorkFolder: Base };

  return Context;
}
