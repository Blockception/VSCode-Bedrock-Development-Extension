import { MCProject } from "bc-minecraft-project";
import { TextDocument } from "../Types/Document/TextDocument";

/**
 *
 * @param project
 * @returns
 */
export function IsEducationEnabled(project: MCProject | TextDocument) {
  if (!MCProject.is(project)) {
    project = project.getConfiguration();
  }

  return project.attributes["education.enable"] === "true";
}
