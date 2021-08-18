import { WorkspaceFolder } from "vscode-languageserver";
import { Console } from "../../Console/Console";
import { Manager } from "../../Manager/Manager";
import { GetWorkSpaces, TraverseWorkspaces } from "./Workspace";

export async function Traverse(): Promise<WorkspaceFolder[] | null> {
  Console.Log("Traversing starting...");
  Manager.State.TraversingProject = true;
  Manager.State.DataGathered = false;

  const p = GetWorkSpaces();
  p.then(TraverseWorkspaces);

  p.catch((err) => {
    Console.Error(`Error traversing: ${JSON.stringify(err)}`);
  });

  p.finally(() => {
    Manager.State.TraversingProject = false;
    Manager.State.DataGathered = true;
    Console.Log("Traversing complete");
  });

  return p;
}
