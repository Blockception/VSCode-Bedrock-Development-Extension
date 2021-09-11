import { WorkspaceFolder } from "vscode-languageserver";
import { TraverseWorkspaces } from "./Traverse/Workspace";

/**
 * @deprecated use TraverseWorkspaces
 */
export function ProcessWorkspace(ws: WorkspaceFolder): void {
  const _ = TraverseWorkspaces([ws]);
}
