import { Animation } from "../../../General/Animation/Animation";
import { Script } from "../../../General/Script/Script";

export interface EntityEvent {
  run_command?: string;
  add?: { component_groups?: string[] };
  remove?: { component_groups?: string[] };
  sequence?: EntityEvent;
  random?: EntityEvent;
}

export interface ComponentContainer {
  [component: string]: any;
}

export namespace ComponentContainer {
  export function MatchComponentName(data: ComponentContainer | undefined, match: string): boolean {
    if (data) {
      for (const component in data) {
        if (component.includes(match)) return true;
      }
    }

    return false;
  }

  export function HasComponentName(data: ComponentContainer | undefined, match: string): boolean {
    if (data) {
      for (const component in data) {
        if (component === match) return true;
      }
    }

    return false;
  }
}

export interface Entity {
  format_version: string;
  "minecraft:entity": {
    description: {
      identifier: string;
      is_spawnable?: boolean;
      is_summonable?: boolean;
      is_experimental?: boolean;
      animations?: Animation;
      scripts?: Script;
    };
    component_groups?: {
      [component_group: string]: ComponentContainer;
    };
    components?: ComponentContainer;
    events?: {
      [event: string]: EntityEvent;
    };
  };
}

export namespace Entity {
  export function is(data: Entity | undefined | null): data is Entity {
    if (data) {
      let mce = data["minecraft:entity"];

      if (mce && mce.description && mce.description.identifier) {
        return true;
      }
    }

    return false;
  }

  export function MatchComponentName(data: Entity, match: string): boolean {
    if (ComponentContainer.MatchComponentName(data["minecraft:entity"].components, match)) return true;

    if (data["minecraft:entity"].component_groups) {
      for (const group in data["minecraft:entity"].component_groups) {
        if (ComponentContainer.MatchComponentName(data["minecraft:entity"].component_groups[group], match)) return true;
      }
    }

    return false;
  }

  export function HasComponentName(data: Entity, match: string): boolean {
    if (ComponentContainer.HasComponentName(data["minecraft:entity"].components, match)) return true;

    if (data["minecraft:entity"].component_groups) {
      for (const group in data["minecraft:entity"].component_groups) {
        if (ComponentContainer.HasComponentName(data["minecraft:entity"].component_groups[group], match)) return true;
      }
    }

    return false;
  }
}
