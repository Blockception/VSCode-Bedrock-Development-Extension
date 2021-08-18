import { Database } from "../Database/include";
import { Traverse } from "../Process/Traverse/Traverse";

/**
 *
 */
export function ReScanProject() {
  Database.Clear();
  return Traverse();
}
