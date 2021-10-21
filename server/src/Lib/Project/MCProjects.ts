import { MCProject } from "bc-minecraft-project";
import { WorkspaceFolder } from "vscode-languageserver";
import { Overlay } from "../Server/Settings";
import { Workspace } from "../Workspace/Workspace";

/**
 *
 */
export function CreateMCProject() : Promise<void> {
  return Workspace.GetWorkSpaces().then(processWorkspace);
}

/**
 *
 * @param ws
 * @returns
 */
function processWorkspace(ws: WorkspaceFolder[] | null): void {
  if (ws === null) return;

  for (let I = 0; I < ws.length; I++) {
    const folder = ws[I].uri;
    const p = GetProject(folder);

    MCProject.saveSync(folder, p);
  }
}

/**
 *
 * @param folder
 * @returns
 */
export function GetProject(folder: string): MCProject {
  return Overlay(MCProject.loadSync(folder));
}

/**
 *
 * @param folder
 * @returns
 */
export async function GetProjectAsync(folder: string): Promise<MCProject> {
  return MCProject.load(folder).then((project) => {
    return Overlay(project);
  });
}

/**
 *
 * @returns
 */
export function GetProjectEmpty(): MCProject {
  return Overlay(MCProject.createEmpty());
}

/**
 * 
 * @returns 
 */
export function UpdateProjectInfo(): Promise<void> {
  return Workspace.GetWorkSpaces().then(processWorkspace);
}
