import { MCProject } from "bc-minecraft-project";
import { WorkspaceFolder } from "vscode-languageserver";
import { Manager } from "../Manager/Manager";
import { Workspace } from "../Workspace/Workspace";

/**
 *
 */
export function CreateMCProject(): Promise<void> {
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
