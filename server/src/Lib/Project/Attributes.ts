import { MCProject } from "bc-minecraft-project";

/**
 *
 * @param project
 * @returns
 */
export function IsEducationEnabled(project: MCProject) {
  return project.attributes["education.enable"] === "true";
}
