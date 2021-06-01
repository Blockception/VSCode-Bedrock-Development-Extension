import { ModeCollection } from "../Interface";

export const DifficultyMode: ModeCollection = {
  Name: "Difficulty Mode",
  Modes: [
    { Name: "1", Description: "Easy mode, mobs will attack in this mode. but at a minimum." },
    { Name: "e", Description: "Easy mode, mobs will attack in this mode. but at a minimum." },
    { Name: "easy", Description: "Easy mode, mobs will attack in this mode. but at a minimum." },

    { Name: "2", Description: "The default difficulty mode for minecraft, mobs will attack." },
    { Name: "n", Description: "The default difficulty mode for minecraft, mobs will attack." },
    { Name: "normal", Description: "The default difficulty mode for minecraft, mobs will attack." },

    { Name: "3", Description: "The most difficult mode for minecraft, mobs will attack somewhat harder." },
    { Name: "h", Description: "The most difficult mode for minecraft, mobs will attack somewhat harder." },
    { Name: "hard", Description: "The most difficult mode for minecraft, mobs will attack somewhat harder." },

    { Name: "0", Description: "The relaxed mode, no mobs with attacking behavior can be spawned" },
    { Name: "p", Description: "The relaxed mode, no mobs with attacking behavior can be spawned" },
    { Name: "peacefull", Description: "The relaxed mode, no mobs with attacking behavior can be spawned" },
  ],
};
