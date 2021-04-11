/** The interface that marks a gamemode*/
export interface ModeCollection {
  /**The collection of different modes*/
  Modes: Mode[];
  /**The name of the collection*/
  Name: string;
}

/** The mode interface */
export interface Mode {
  /**The name of this mode*/
  Name: string;
  /**The description of this mode*/
  Description: string;
}

export namespace ModeCollection {
  export function is(value: any): value is ModeCollection {
    if (value) {
      let temp = value as ModeCollection;

      if (temp.Name && temp.Modes && Array.isArray(value.Modes)) return true;
    }

    return false;
  }
}

export namespace Mode {
  export function is(value: any): value is Mode {
    if (value && value.Name && value.Description) return true;

    return false;
  }
}
