import { MCProject } from "bc-minecraft-project";
import { Settings } from "../lsp/extension/settings";

/**
 *
 * @param folder
 * @returns
 */
export function getProject(folder: string, settings: Settings): MCProject {
  return overlay(MCProject.loadSync(folder), settings);
}

/**
 *
 * @param folder
 * @returns
 */
export async function GetProjectAsync(folder: string, settings: Settings): Promise<MCProject> {
  return MCProject.load(folder).then((project) => {
    return overlay(project, settings);
  });
}

/**
 *
 * @returns
 */
export function getProjectEmpty(settings: Settings): MCProject {
  return overlay(MCProject.createEmpty(), settings);
}

/**
 *
 * @param project
 * @returns
 */
export function overlay(project: MCProject, settings: Settings): MCProject {
  overlayIf(project, "education.enable", `${settings.Education.Enable}`);
  overlayIf(project, "diagnostic.enable", `${settings.Diagnostics.Enable}`);
  overlayIf(project, "diagnostic.lang", `${settings.Diagnostics.Lang}`);
  overlayIf(project, "diagnostic.json", `${settings.Diagnostics.Json}`);
  overlayIf(project, "diagnostic.mcfunction", `${settings.Diagnostics.Mcfunctions}`);
  overlayIf(project, "diagnostic.objectives", `${settings.Diagnostics.Objectives}`);
  overlayIf(project, "diagnostic.tags", `${settings.Diagnostics.Tags}`);
  overlayIf(project, "completion.json", `${settings.Completion.JSON}`);
  overlayIf(project, "completion.lang.comments", `${settings.Completion.Lang.Comments}`);
  overlayIf(project, "completion.lang.dynamic", `${settings.Completion.Lang.Dynamic}`);

  return project;
}

function overlayIf(project: MCProject, key: string, value: string) {
  if (project.attributes[key] === undefined) project.attributes[key] = value;
}
