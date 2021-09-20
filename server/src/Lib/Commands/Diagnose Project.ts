import { ExecuteCommandParams } from "vscode-languageserver";
import { Traverse } from "../Process/Traverse";

export function DiagnoseProjectCommand(params: ExecuteCommandParams) {
  console.log("Starting on diagnosing project");

  Traverse();
}
