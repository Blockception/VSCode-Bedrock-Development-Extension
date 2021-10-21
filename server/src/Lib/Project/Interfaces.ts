import { MCProject } from "bc-minecraft-project";

export interface MCProjectProvider {
  /**
   *
   */
  getConfiguration(): MCProject;
}

export namespace MCProjectProvider {
  export function is(value: any): value is MCProjectProvider {
    if (typeof value === "object") {
      if (typeof value.getConfiguration === "undefined") return false;

      return true;
    }

    return false;
  }
}
