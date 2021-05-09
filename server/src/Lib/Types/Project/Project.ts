import { ServerSettings } from "../../Server/include";
import * as MC from "bc-minecraft-project";
import { Manager } from "../../Manager/include";

/**
 *
 */
export interface ProjectData {
  /**
   *
   */
  defintions: Definitions;

  /**
   *
   */
  settings: ServerSettings;

  /**
   *
   */
  ignores: string[];
}

/**
 *
 */
export namespace ProjectData {
  /**
   *
   * @param receiver
   */
  export function SetSettings(receiver: ProjectData): void {
    receiver.settings = ServerSettings.clone(Manager.Settings);
  }

  /**
   *
   * @param receiver
   * @param project
   */
  export function SetProject(receiver: ProjectData, project: MC.MCProject) {
    //Definitions
    Transfer(receiver.defintions.family, project.definitions["family"]);
    Transfer(receiver.defintions.family, project.definitions["tag"]);
    Transfer(receiver.defintions.family, project.definitions["name"]);
    Transfer(receiver.defintions.family, project.definitions["objectives"]);

    //Ignores
    receiver.ignores.push(...project.ignores.patterns);

    //Attributes
    let attributes = project.attributes;
    //Education edition
    receiver.settings.Education.Enable = ToBoolean(attributes["education.enable"], false);
    //Diagnostics
    let Diag = receiver.settings.Diagnostics;
    Diag.Enable = ToBoolean(attributes["diagnostic.enable"], false);
    Diag.Json = ToBoolean(attributes["diagnostic.json"], false);
    Diag.Lang = ToBoolean(attributes["diagnostic.lang"], false);
    Diag.Mcfunctions = ToBoolean(attributes["diagnostic.mcfunction"], false);
    Diag.Objectives = ToBoolean(attributes["diagnostic.objective"], false);
    Diag.Tags = ToBoolean(attributes["diagnostic.tag"], false);
  }

  /**
   *
   * @param override
   * @param Default
   * @returns
   */
  function ToBoolean(override: string | undefined | null, Default: boolean): boolean {
    if (override === undefined || override === null) {
      return Default;
    }

    return override === "true";
  }

  /**
   *
   * @param receiver
   * @param source
   * @returns
   */
  function Transfer(receiver: MC.Definition, source: MC.Definition | undefined | null): void {
    if (!source) return;

    receiver.defined.push(...source.defined);
    receiver.excluded.push(...source.excluded);
  }
}

/**
 *
 */
export interface Definitions {
  /**The definitions of tags*/
  tag: MC.Definition;
  /**The definitions of tags*/
  family: MC.Definition;
  /**The definitions of tags*/
  objective: MC.Definition;
  /**The definitions of tags*/
  name: MC.Definition;
}

/**
 *
 */
export namespace Definitions {
  /**
   *
   */
  export function createEmpty(): Definitions {
    return {
      family: MC.Definition.createEmpty(),
      name: MC.Definition.createEmpty(),
      tag: MC.Definition.createEmpty(),
      objective: MC.Definition.createEmpty(),
    };
  }
}
