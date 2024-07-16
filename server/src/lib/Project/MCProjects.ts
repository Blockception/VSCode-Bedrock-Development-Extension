import { MCProject } from "bc-minecraft-project";
import { Manager } from "../manager/manager";

/**
 *
 * @param folder
 * @returns
 */
export function GetProject(folder: string): MCProject {
  return overlay(MCProject.loadSync(folder));
}

/**
 *
 * @param folder
 * @returns
 */
export async function GetProjectAsync(folder: string): Promise<MCProject> {
  return MCProject.load(folder).then((project) => {
    return overlay(project);
  });
}

/**
 *
 * @returns
 */
export function GetProjectEmpty(): MCProject {
  return overlay(MCProject.createEmpty());
}

/**
 *
 * @param project
 * @returns
 */
export function overlay(project: MCProject): MCProject {
  const settings = Manager.Settings;

  overlayIf(project, "education.enable", `${settings.Education.Enable}`);
  overlayIf(project, "diagnostic.enable", `${settings.Diagnostics.Enable}`);
  overlayIf(project, "diagnostic.lang", `${settings.Diagnostics.Lang}`);
  overlayIf(project, "diagnostic.json", `${settings.Diagnostics.Json}`);
  overlayIf(project, "diagnostic.mcfunction", `${settings.Diagnostics.Mcfunctions}`);
  overlayIf(project, "diagnostic.objectives", `${settings.Diagnostics.Objectives}`);
  overlayIf(project, "diagnostic.tags", `${settings.Diagnostics.Tags}`);

  return project;
}

function overlayIf(project: MCProject, key: string, value: string) {
  if (project.attributes[key] === undefined) project.attributes[key] = value;
}
