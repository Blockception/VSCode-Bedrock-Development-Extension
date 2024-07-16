import { ExecuteCommandParams } from "vscode-languageserver";
import { Console } from "../manager/console";
import { Traverse } from "../process/Traverse";

export function DiagnoseProjectCommand(params: ExecuteCommandParams) {
  Console.Log("Starting on diagnosing project");

  Traverse();
}
