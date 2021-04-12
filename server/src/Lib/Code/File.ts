import { readdirSync, statSync } from "fs";
import { WorkspaceFolder } from "vscode-languageserver";
import { URI } from "vscode-uri";
import { Manager } from "../Manager/Manager";

export function GetFilename(filepath: string): string {
  filepath = filepath.replace(/\\/g, "//");
  let index = filepath.lastIndexOf("/");

  if (index > -1) {
    filepath = filepath.substring(index + 1, filepath.length);
  }

  index = filepath.lastIndexOf(".");

  if (index > -1) {
    filepath = filepath.substring(0, index);
  }

  return filepath.trim();
}

export function getExtension(filepath: string): string {
  let index = filepath.lastIndexOf(".");

  if (index < 0) return "";

  return filepath.substring(index, filepath.length).trim();
}

export function GetProjectFiles(): Promise<string[]> {
  let workspaces = Manager.Connection.workspace.getWorkspaceFolders();

  return workspaces.then(
    (x) => new Promise<string[]>((resolve, reject) => resolve(CollectFiles(x)))
  );
}

export function GetParent(uri: string): string {
  let Index = uri.lastIndexOf("\\");

  if (Index > -1) {
    return uri.slice(0, Index + 1);
  }

  Index = uri.lastIndexOf("/");

  if (Index > -1) {
    return uri.slice(0, Index + 1);
  }

  return uri;
}

function CollectFiles(folders: WorkspaceFolder[] | null): string[] {
  let files: string[] = [];
  let dirs: string[] = [];

  if (folders == null) return files;

  for (let I = 0; I < folders.length; I++) {
    let Path = URI.parse(folders[I].uri).fsPath;
    dirs.push(Path);
  }

  for (let I = 0; I < dirs.length; I++) {
    let dir = dirs[I];

    if (!dir.endsWith("\\")) dir += "\\";

    let Out = readdirSync(dir);

    for (let J = 0; J < Out.length; J++) {
      let Item = dir + Out[J];

      if (statSync(Item).isDirectory()) {
        if (!Item.includes(".git")) {
          dirs.push(Item);
        }
      } else {
        files.push(Item);
      }
    }
  }

  return files;
}
