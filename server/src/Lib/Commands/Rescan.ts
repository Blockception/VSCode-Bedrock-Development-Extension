import { Database } from "../Database/include";
import { Traverse } from "../Process/Traverse";

/**
 *
 */
export function ReScanProject() {
  console.info("Rescanning of project initiated");
  Database.Clear();
  return Traverse();
}
