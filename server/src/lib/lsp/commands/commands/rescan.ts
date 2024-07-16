import { Database } from "../../../database/database";
import { Console } from "../../../manager/console";
import { Traverse } from "../../process/traverse";

/**
 *
 */
export function ReScanProject() {
  Console.Info("Rescanning of project initiated");
  Database.Clear();
  return Traverse();
}
