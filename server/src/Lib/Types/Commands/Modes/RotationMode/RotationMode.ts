import { ModeCollection } from "../Interface";

export const RotationMode: ModeCollection = {
  Name: "Rotation mode",
  Modes: [
    { Name: "0_degrees", Description: "Do not rotate the structure" },
    { Name: "90_degrees", Description: "Rotates the structure clockwise 90 degrees" },
    { Name: "180_degrees", Description: "Rotates the structure clockwise 180 degrees" },
    { Name: "270_degrees", Description: "Rotates the structure clockwise 270 degrees" },
  ],
};
