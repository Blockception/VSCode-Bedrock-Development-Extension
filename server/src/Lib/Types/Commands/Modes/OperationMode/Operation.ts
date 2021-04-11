import { ModeCollection } from "../Interface";

export const OperationModes: ModeCollection = {
  Name: "scoreboard operation",
  Modes: [
    { Name: "=", Description: "Assigns the targets score to that of the source" },
    { Name: ">", Description: "Calculates the maximum value of the sources and the target and stores it in the target" },
    { Name: "<", Description: "Calculates the minimum value of the sources and the target" },
    { Name: "><", Description: "Swaps the scores between the given source and the target" },
    { Name: "+=", Description: "Adds the sources score to the target" },
    { Name: "-=", Description: "Substracts the sources score to the target" },
    { Name: "*=", Description: "Multiplies the sources score to the target" },
    { Name: "%=", Description: "Modulus divide target's score by source's score, and use the remainder to set the target score" },
    { Name: "/=", Description: "Divides the source score to the target" },
  ],
};
