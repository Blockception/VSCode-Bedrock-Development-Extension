import { Database } from "../Database/include";
import { Manager } from "../Manager/Manager";
import { TextDocument } from "../Types/Document/TextDocument";

export function Diagnostics(doc: TextDocument): void {
  if (!Manager.State.DataGathered) return;

  //Send it off to the diagnoser
  Database.Diagnoser.Process(doc);
}
