import { ModeCollection } from "../Interface";

export const RideRulesMode: ModeCollection = {
  Name: "Ride Rules Mode",
  Modes: [
    { Name: "no_ride_change", Description: "Does not change riders positions" },
    { Name: "reassign_rides", Description: "Does change riders positions" },
    { Name: "skip_riders", Description: "Skips riders" },
  ],
};
