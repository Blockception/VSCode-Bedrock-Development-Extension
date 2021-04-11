import { ModeCollection } from "../Interface";

export const MaskMode: ModeCollection = {
  Name: "Mask Mode",
  Modes: [
    { Name: "filtered", Description: "Using a filtered setting" },
    { Name: "masked", Description: "Clones the area using a mask" },
    { Name: "replace", Description: "Replaces the specified block" },
  ],
};
