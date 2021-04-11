import { ModeCollection } from "../Interface";

export const RideFillMode: ModeCollection = {
  Name: "Ride Fill Mode",
  Modes: [
    { Name: "if_group_fits", Description: "If the entity fits then its placed" },
    { Name: "until_full", Description: "Keep adding entities until full" },
  ],
};
