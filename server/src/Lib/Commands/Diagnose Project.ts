import { ExecuteCommandParams } from "vscode-languageserver";
import { Console } from "../Console/Console";
import { Traverse } from "../Process/Traverse";

export function DiagnoseProjectCommand(params: ExecuteCommandParams) {
  Console.Log("Starting on diagnosing project");

  Traverse();
}
