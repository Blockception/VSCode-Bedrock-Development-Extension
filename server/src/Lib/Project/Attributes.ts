import { MCProject } from "bc-minecraft-project";
import { MCProjectProvider } from "./Interfaces";

/**
 *
 * @param project
 * @returns
 */
export function IsEducationEnabled(project: MCProject | MCProjectProvider) {
  if (MCProjectProvider.is(project)) {
    project = project.getConfiguration();
  }

  return project.attributes["education.enable"] === "true";
}

/**
 *
 * @param project
 * @returns
 */
export function IsDiagnosticsEnabled(project: MCProject | MCProjectProvider) {
  if (MCProjectProvider.is(project)) {
    project = project.getConfiguration();
  }

  return project.attributes["diagnostic.enable"] === "true";
}

/**
 *
 * @param project
 * @returns
 */
export function IsDiagnosticsJsonEnabled(project: MCProject | MCProjectProvider) {
  if (MCProjectProvider.is(project)) {
    project = project.getConfiguration();
  }

  return project.attributes["diagnostic.json"] === "true";
}

/**
 *
 * @param project
 * @returns
 */
export function IsDiagnosticsLangEnabled(project: MCProject | MCProjectProvider) {
  if (MCProjectProvider.is(project)) {
    project = project.getConfiguration();
  }

  return project.attributes["diagnostic.lang"] === "true";
}
