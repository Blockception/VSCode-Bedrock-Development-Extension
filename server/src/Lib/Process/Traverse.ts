import { GetProjectFiles, ProjectFiles } from "../Code/include";
import { Console } from "../Console/Console";
import { Manager } from "../Manager/Manager";
import { Behavior, Resource } from "../Types/Minecraft/include";

export function Traverse(): Promise<ProjectFiles> {
  Console.Log("Traversing starting...");
  Manager.State.TraversingProject = true;
  Manager.State.DataGathered = false;

  const p = GetProjectFiles();
  p.then(TraverseProject);
  p.catch((err) => {
    Console.Error(`error traversing: ${JSON.stringify(err)}`);
    Manager.State.TraversingProject = false;
    Manager.State.DataGathered = true;
  });

  return p;
}

export function TraverseProject(Project: ProjectFiles | undefined): void {
  if (!Project) return;

  try {
    Console.Log("Processing behavior packs");
    Project.BehaviorPackFolders.forEach(Behavior.ProcessBehaviorPack);

    Console.Log("Processing resource packs");
    Project.ResourcePackFolders.forEach(Resource.ProcessResourcePack);
  } catch (err) {
    Console.Error(JSON.stringify(err));
  }

  Manager.State.TraversingProject = false;
  Manager.State.DataGathered = true;
  Console.Log("Traversing complete");
}
