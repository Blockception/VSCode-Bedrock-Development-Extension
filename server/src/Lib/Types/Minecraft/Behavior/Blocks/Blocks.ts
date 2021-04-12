export interface Block {
  format_version: string;
  "minecraft:block": {
    description: {
      identifier: string;
      register_to_creative_menu: boolean;
    };
    components: object;
  };
}

export namespace Block {
  export function is(value: any): value is Block {
    if (value && value.format_version && value["minecraft:block"] && value["minecraft:block"].description && value["minecraft:block"].description.identifier) {
      return true;
    }

    return false;
  }
}
