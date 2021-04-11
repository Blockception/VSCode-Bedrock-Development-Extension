import { ModeCollection } from "../Interface";

export const StructureAnimationMode: ModeCollection = {
  Name: "Structure Animation Mode",
  Modes: [
    { Name: "block_by_block", Description: "Animate the whole process block by block" },
    { Name: "layer_by_layer", Description: "Animate the whole process layer by layer" },
  ],
};
