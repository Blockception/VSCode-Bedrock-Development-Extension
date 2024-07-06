import { DataSet, Pack } from "bc-minecraft-bedrock-project";
import { MCProject } from "bc-minecraft-project";
import { existsSync, mkdir, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { WorkspaceFolder } from "vscode-languageserver-protocol";
import { HandleError } from "../Code/Error";
import { Fs } from "../Code/Url";
import { Database } from "../Database/Database";
import { Workspace } from "../Workspace/Workspace";

export function StoreProject() {
  Workspace.GetWorkSpaces().then(Store);
}

function Store(value: WorkspaceFolder[]) {
  const folder = Fs.FromVscode(value[0].uri);

  const outputfolder = path.join(folder, ".minecraft");

  if (!existsSync(outputfolder)) mkdirSync(outputfolder);

  let count = 0;
  let generate: (pack: Pack | WorkspaceFolder | MCProject) => void = (pack: Pack | WorkspaceFolder | MCProject) => {
    ConvertStore(path.join(outputfolder, `bp_pack_${count++}.json`), pack);
  };

  Database.ProjectData.BehaviorPacks.packs.forEach(generate);

  count = 0;
  generate = (pack: Pack | WorkspaceFolder | MCProject) => {
    ConvertStore(path.join(outputfolder, `rp_pack_${count++}.json`), pack);
  };

  Database.ProjectData.ResourcePacks.packs.forEach(generate);

  ConvertStore(path.join(outputfolder, `general.json`), Database.ProjectData.General);

  count = 0;
  generate = (pack: Pack | WorkspaceFolder | MCProject) => {
    ConvertStore(path.join(outputfolder, `workspace_${count++}.json`), pack);
  };

  Database.WorkspaceData.forEach(generate);
}

function ConvertStore(filepath: string, data: any): void {
  const temp: Record<string, any> = {};

  Convert(data, temp);
  StoreObject(filepath, temp);
}

function Convert(data: any, receiver: Record<string, any>) {
  const names = Object.getOwnPropertyNames(data);

  for (let I = 0; I < names.length; I++) {
    const name = names[I];

    const value = data[name];

    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      receiver[name] = value;
    } else if (value.forEach) {
      const values: any[] = [];

      value.forEach((item: any) => values.push(item));

      receiver[name] = values;
    } else if (typeof value === "object") {
      receiver[name] = value;
    }
  }
}

function StoreObject(path: string, data: any): void {
  try {
    const content = JSON.stringify(data);
    writeFileSync(path, content);
  } catch (err) {
    HandleError(err);
  }
}
