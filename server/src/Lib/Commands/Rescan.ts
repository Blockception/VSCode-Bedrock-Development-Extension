import { Console } from "../Console/include";
import { Database } from "../Database/include";
import { Traverse } from "../Process/Traverse";

/**
 *
 */
export function ReScanProject() {
  Console.Log("Cleaing database");
  Database.ProjectData.Clear();

  Traverse();
}
