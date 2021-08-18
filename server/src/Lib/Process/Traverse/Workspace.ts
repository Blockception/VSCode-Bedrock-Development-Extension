import { WorkspaceFolder } from "vscode-languageserver";
import { Console } from "../../Console/include";
import { Manager } from "../../Manager/Manager";
import { ProcessWorkspace } from "../Workspace";

/**
 *
 * @param folders
 * @returns
 */
export function TraverseWorkspaces(folders: WorkspaceFolder[] | null): void {
  if (folders) {
    folders.forEach((ws) => ProcessWorkspace(ws));
  }
}
