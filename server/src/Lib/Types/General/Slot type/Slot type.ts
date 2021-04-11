import { Mode, ModeCollection } from "../../Commands/Modes/include";

export interface SlotTypeModeCollection extends ModeCollection {
  Modes: SlotTypeMode[];
}

export interface SlotTypeMode extends Mode {
  range?: { min: number; max: number };
}

export namespace SlotTypeMode {
  export function is(value: any): value is SlotTypeMode {
    if (value && value.Name && value.Description) {
      return true;
    }

    return false;
  }
}

export const SlotTypeModes: SlotTypeModeCollection = {
  Name: "slot type",
  Modes: [
    { Name: "slot.armor.chest", Description: "The slot that targets the chest area of armor" },
    { Name: "slot.armor.feet", Description: "The slot that targets the feet area of armor" },
    { Name: "slot.armor.head", Description: "The slot that targets the helemt/head area of armor" },
    { Name: "slot.armor.legs", Description: "The slot that targets the legs/leggings area of armor" },
    { Name: "slot.chest", Description: "The slot that targets the chest, such as on donkeys", range: { min: 0, max: 14 } },
    { Name: "slot.container", Description: "Only used for /replaceitem block", range: { min: 0, max: 53 } },
    { Name: "slot.enderchest", Description: "", range: { min: 0, max: 26 } },
    { Name: "slot.hotbar", Description: "", range: { min: 0, max: 8 } },
    { Name: "slot.inventory", Description: "", range: { min: 0, max: 26 } },
    { Name: "slot.saddle", Description: "" },
    { Name: "slot.weapon.mainhand", Description: "" },
    { Name: "slot.weapon.offhand", Description: "" },
  ],
};
