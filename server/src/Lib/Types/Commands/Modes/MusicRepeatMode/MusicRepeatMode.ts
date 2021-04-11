import { ModeCollection } from "../Interface";

export const MusicRepeatMode: ModeCollection = {
  Name: "Music Repeat Mode",
  Modes: [
    { Name: "loop", Description: "Loops the given track" },
    { Name: "play_once", Description: "Only plays the given track once" },
  ],
};
