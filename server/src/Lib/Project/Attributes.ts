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

/**
 *
 * @param project
 * @returns
 */
export function IsDiagnosticsEnabled(project: MCProject | TextDocument) {
  if (!MCProject.is(project)) {
    project = project.getConfiguration();
  }

  return project.attributes["diagnostic.enable"] === "true";
}

/**
 *
 * @param project
 * @returns
 */
export function IsDiagnosticsJsonEnabled(project: MCProject | TextDocument) {
  if (!MCProject.is(project)) {
    project = project.getConfiguration();
  }

  return project.attributes["diagnostic.json"] === "true";
}

/**
 *
 * @param project
 * @returns
 */
export function IsDiagnosticsLangEnabled(project: MCProject | TextDocument) {
  if (!MCProject.is(project)) {
    project = project.getConfiguration();
  }

  return project.attributes["diagnostic.lang"] === "true";
}
