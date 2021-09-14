import { Pack } from "bc-minecraft-bedrock-project";
import { Console } from "../Console/Console";
import { Manager } from "../Manager/Manager";
import { Workspace } from "../Workspace/Workspace";

export async function Traverse(): Promise<Pack[]> {
  Console.Info("Traversing starting...");
  Manager.State.TraversingProject = true;
  Manager.State.DataGathered = false;

  const out = Workspace.GetWorkSpaces().then(Workspace.TraverseWorkspaces);

  out.finally(() => {
    Manager.State.TraversingProject = false;
    Manager.State.DataGathered = true;
    Console.Info("Traversing complete");
  });

  out.catch((err) => {
    Console.Error(JSON.stringify(err));
  });

  return out;
}
