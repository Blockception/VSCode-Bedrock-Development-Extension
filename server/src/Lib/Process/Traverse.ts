import { Pack } from "bc-minecraft-bedrock-project";
import { HandleError } from "../Code/Error";
import { ProvidePackDiagnostics } from "../Diagnostics/OnRequest";
import { Console } from "../Manager/Console";
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
    HandleError(err);
  });

  out.then((packs) => packs.forEach(ProvidePackDiagnostics));

  return out;
}
