import { ModeCollection } from "./Interface";

export function GetMode<T extends ModeCollection>(Collection: T, Name: string) {
  for (let I = 0; I < Collection.Modes.length; I++) {
    let Mode = Collection.Modes[I];
    if (Mode.Name === Name) return Mode;
  }

  return undefined;
}

export function IsMode<T extends ModeCollection>(Collection: T, Name: string): boolean {
  for (let I = 0; I < Collection.Modes.length; I++) {
    let Mode = Collection.Modes[I];
    if (Mode.Name === Name) return true;
  }

  return false;
}
