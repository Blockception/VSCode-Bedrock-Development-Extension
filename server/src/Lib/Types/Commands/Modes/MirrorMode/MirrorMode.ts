import { ModeCollection } from "../Interface";

export const MirrorMode: ModeCollection = {
  Name: "Mirror mode",
  Modes: [
    { Name: "none", Description: "Does not mirror the structure" },
    { Name: "x", Description: "Mirrors the structure using the x - axis as the mirror" },
    { Name: "xz", Description: "Mirrors the structure using the x - axis and z - axis as the mirror" },
    { Name: "z", Description: "Mirrors the structure using the z - axis as the mirror" },
  ],
};
