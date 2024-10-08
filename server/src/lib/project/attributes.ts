import { MCProject } from "bc-minecraft-project";
import { MCProjectprovider } from "./interfaces";

/**
 *
 * @param project
 * @returns
 */
export function IsEducationEnabled(project: MCProject | MCProjectprovider) {
  if (MCProjectprovider.is(project)) {
    project = project.configuration();
  }

  return project.attributes["education.enable"] === "true";
}

/**
 *
 * @param project
 * @returns
 */
export function IsDiagnosticsEnabled(project: MCProject | MCProjectprovider) {
  if (MCProjectprovider.is(project)) {
    project = project.configuration();
  }

  return project.attributes["diagnostic.enable"] === "true";
}

/**
 *
 * @param project
 * @returns
 */
export function IsDiagnosticsJsonEnabled(project: MCProject | MCProjectprovider) {
  if (MCProjectprovider.is(project)) {
    project = project.configuration();
  }

  return project.attributes["diagnostic.json"] === "true";
}

/**
 *
 * @param project
 * @returns
 */
export function IsDiagnosticsLangEnabled(project: MCProject | MCProjectprovider) {
  if (MCProjectprovider.is(project)) {
    project = project.configuration();
  }

  return project.attributes["diagnostic.lang"] === "true";
}
