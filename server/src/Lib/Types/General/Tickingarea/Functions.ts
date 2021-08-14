import { Database } from "../../../Database/include";

export function IsTickingArea(name: string): boolean {
  if (Database.ProjectData.General.TickingAreas.GetFromID(name) === undefined) {
    if (name.startsWith('"') && name.endsWith('"')) return true;

    if (name.includes(" ")) {
      return false;
    }
  }

  return true;
}
