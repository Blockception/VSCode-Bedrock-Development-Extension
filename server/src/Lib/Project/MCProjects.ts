import { MCProject } from "bc-minecraft-project";
import { Manager } from "../Manager/Manager";





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
 * @param project 
 * @returns 
 */
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
