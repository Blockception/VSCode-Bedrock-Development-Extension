import { FormatVersion } from "../../Interfaces/FormatVersion";

export type render_controller_ref = string | { [render_controller: string]: string };

export interface Entity extends FormatVersion {
  "minecraft:client_entity": {
    description: {
      identifier: string;
      animations?: { [animation: string]: string };
      geometry?: { [geo: string]: string };
      render_controllers?: render_controller_ref[];
      textures?: { [geo: string]: string };
    };
  };
}

export namespace Entity {
  export function is(value: any): value is Entity {
    if (value.format_version && value["minecraft:client_entity"] && value["minecraft:client_entity"].description && value["minecraft:client_entity"].description.identifier) {
      return true;
    }

    return false;
  }
}
