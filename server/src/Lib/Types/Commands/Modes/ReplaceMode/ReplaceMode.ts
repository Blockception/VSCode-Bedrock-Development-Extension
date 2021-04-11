import { ModeCollection } from "../Interface";

export const ReplaceMode: ModeCollection = {
  Name: "Fill mode",
  Modes: [
    { Name: "destroy", Description: "Destroy the old" },
    { Name: "keep", Description: "Keeps the old if there is any" },
  ],
};
