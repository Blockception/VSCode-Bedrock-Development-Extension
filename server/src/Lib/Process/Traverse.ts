import { Pack } from "bc-minecraft-bedrock-project";
import { HandleError } from "../Code/Error";
import { Manager } from "../Manager/Manager";
import { Workspace } from "../Workspace/Workspace";

export async function Traverse(): Promise<Pack[]> {
  console.info("Traversing starting...");
  Manager.State.TraversingProject = true;
  Manager.State.DataGathered = false;

  const out = Workspace.GetWorkSpaces().then(Workspace.TraverseWorkspaces);

  out.finally(() => {
    Manager.State.TraversingProject = false;
    Manager.State.DataGathered = true;
    console.info("Traversing complete");
  });

  out.catch((err) => {
    HandleError(err);
  });

  return out;
}
