import { ModeCollection } from "../Interface";

export const RideFillMode: ModeCollection = {
  Name: "Ride Fill Mode",
  Modes: [
    { Name: "destroy", Description: "Destroy the old block, if tile drops is on, they all will drop an item" },
    { Name: "hollow", Description: "Create a hollow cube" },
    { Name: "keep", Description: "Keeps the old blocks, replaces only air" },
    { Name: "outline", Description: "Just sets the outline" },
    { Name: "replace", Description: "Replaces a specified block with the given block" },
  ],
};
