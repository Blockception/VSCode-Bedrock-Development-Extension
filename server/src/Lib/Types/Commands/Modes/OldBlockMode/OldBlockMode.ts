import { ModeCollection } from "../Interface";

export const OldBlockModeModes: ModeCollection = {
  Name: "Old block modes",
  Modes: [
    { Name: "destroy", Description: "Destroys the old block" },
    { Name: "replace", Description: "Replaces the old block without destroying it" },
    { Name: "keep", Description: "Keeps the old block if its not air" },
  ],
};
