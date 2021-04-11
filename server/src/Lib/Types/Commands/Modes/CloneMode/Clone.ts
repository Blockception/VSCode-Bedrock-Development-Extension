import { ModeCollection } from "../Interface";

export const CameraShakeModes: ModeCollection = {
  Name: "Clone mode",
  Modes: [
    { Name: "force", Description: "Forces the clone even if the source and destination regions overlap." },
    {
      Name: "move",
      Description:
        "Clone the source region to the destination region, then replace the source region with air. When used in filtered mask mode, only the cloned blocks are replaced with air.",
    },
    { Name: "normal", Description: "Execute the clone under default operations." },
  ],
};
