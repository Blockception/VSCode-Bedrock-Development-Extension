import { MCProject } from "bc-minecraft-project";

export interface MCProjectprovider {
  /**
   *
   */
  configuration(): MCProject;
}

export namespace MCProjectprovider {
  export function is(value: any): value is MCProjectprovider {
    if (typeof value === "object") {
      if (typeof value.configuration === "undefined") return false;

      return true;
    }

    return false;
  }
}
