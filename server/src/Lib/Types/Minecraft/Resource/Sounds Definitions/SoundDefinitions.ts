export interface SoundDefinitions {
  format_version: string;
  sound_definitions: {
    [key: string]: SoundDefinition;
  };
}

export namespace SoundDefinitions {
  export function is(value: any): value is SoundDefinitions {
    if (value) {
      if (typeof value.format_version === "string" && typeof value.sound_definitions === "object") return true;
    }

    return false;
  }
}

export interface SoundDefinition {
  category?: string;
  sounds?: (string | Sound)[];
  __use_legacy_max_distance: boolean;
}

export interface Sound {
  name?: string;
  load_on_low_memory?: boolean;
  stream?: boolean;
  volume?: number;
}

export namespace Sound {
  export function is(value: any): value is Sound {
    if (value) {
      if (typeof value === "object") return true;
    }

    return false;
  }
}
