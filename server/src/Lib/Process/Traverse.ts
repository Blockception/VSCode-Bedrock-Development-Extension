import { Pack } from "bc-minecraft-bedrock-project";
import { Console } from "../Console/Console";
import { Manager } from "../Manager/Manager";
import { GetWorkspaces } from "../Manager/Workspace";
import { Workspace } from "../Workspace/Workspace";

export async function Traverse(): Promise<Pack[]> {
  Console.Log("Traversing starting...");
  Manager.State.TraversingProject = true;
  Manager.State.DataGathered = false;

  const p = GetWorkspaces();
  const out = p.then(Workspace.TraverseWorkspaces);

  out.finally(() => {
    Manager.State.TraversingProject = false;
    Manager.State.DataGathered = true;
    Console.Log("Traversing complete");
  });

  return out;
}
