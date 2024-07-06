import { Pack } from "bc-minecraft-bedrock-project";
import { WorkspaceFolder } from "vscode-languageserver";
import { Workspace } from "../Workspace/Workspace";

/**
 * @deprecated use TraverseWorkspace
 */
export function ProcessWorkspace(ws: WorkspaceFolder): Promise<Pack[]> {
  return Workspace.TraverseWorkspace(ws);
}
