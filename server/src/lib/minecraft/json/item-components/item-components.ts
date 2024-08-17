export interface ItemComponents {
  "minecraft:can_destroy": { blocks: string[] } | undefined;
  "minecraft:can_place_on": { blocks: string[] } | undefined;
  "minecraft:keep_on_death": object | undefined;
  "minecraft:lock_in_inventory": object | undefined;
  "minecraft:lock_in_slot": object | undefined;
}

export namespace ItemComponents {
  //write is
}
