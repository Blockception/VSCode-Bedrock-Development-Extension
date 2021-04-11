export interface ItemImport {
  format_version: string;
  "minecraft:item": {
    description: {
      identifier: string;
    };
    components: any;
  };
}

export function IsProperlyDefined(data: ItemImport | undefined | null): data is ItemImport {
  if (data) {
    let mce = data["minecraft:item"];

    if (mce && mce.description && mce.description.identifier) {
      return true;
    }
  }

  return false;
}
