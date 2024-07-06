import { MCProject } from "bc-minecraft-project";

export interface MCProjectprovider {
  /**
   *
   */
  getConfiguration(): MCProject;
}

export namespace MCProjectprovider {
  export function is(value: any): value is MCProjectprovider {
    if (typeof value === "object") {
      if (typeof value.getConfiguration === "undefined") return false;

      return true;
    }

    return false;
  }
}
