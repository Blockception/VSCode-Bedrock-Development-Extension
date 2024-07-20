/**
 *
 */
export interface ServerSettings {
  /** */
  Education: {
    /** */
    Enable: boolean;
  };
  /** */
  Diagnostics: {
    /** */
    Enable: boolean;
    /** */
    Lang: boolean;
    /** */
    Json: boolean;
    /** */
    Mcfunctions: boolean;
    /** */
    Objectives: boolean;
    /** */
    Tags: boolean;
  };
  /** */
  Plugin: {
    /** */
    CodeLens: boolean;
  };
  Completion: {
    JSON: boolean,
    Lang: {
      Dynamic: boolean,
      Comments: boolean
    }
  }
}

/**
 * 
 */
export namespace ServerSettings {
  /**
   * 
   * @param value 
   * @returns 
   */
  export function is(value: any): value is ServerSettings {
    if (value) {
      const temp = <ServerSettings>value;

      if (temp.Education && temp.Diagnostics && temp.Plugin) {
        if (typeof temp.Education.Enable !== "boolean") return false;

        if (typeof temp.Diagnostics.Enable !== "boolean") return false;
        if (typeof temp.Diagnostics.Lang !== "boolean") return false;
        if (typeof temp.Diagnostics.Json !== "boolean") return false;
        if (typeof temp.Diagnostics.Mcfunctions !== "boolean") return false;
        if (typeof temp.Diagnostics.Objectives !== "boolean") return false;
        if (typeof temp.Diagnostics.Tags !== "boolean") return false;

        if (typeof temp.Plugin.CodeLens !== "boolean") return false;

        if (typeof temp.Completion.JSON !== "boolean") return false;
        if (typeof temp.Completion.Lang.Comments !== "boolean") return false;
        if (typeof temp.Completion.Lang.Dynamic !== "boolean") return false;

        return true;
      }
    }

    return false;
  }

  /**
   *
   * @param value
   * @returns
   */
  export function clone(value: ServerSettings): ServerSettings {
    return Object.assign({}, value);
  }

  /**
   * 
   * @returns 
   */
  export function createDefaultSettings(): ServerSettings {
    const Out: ServerSettings = {
      Education: {
        Enable: true,
      },
      Diagnostics: {
        Enable: true,
        Lang: true,
        Json: true,
        Mcfunctions: true,
        Objectives: true,
        Tags: true,
      },
      Plugin: {
        CodeLens: true,
      },
      Completion: {
        JSON: true,
        Lang: {
          Comments: true,
          Dynamic: true
        }
      }
    };

    return Out;
  }
}
