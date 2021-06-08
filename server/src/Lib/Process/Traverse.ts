import { ProjectFiles } from "../Code/include";
import { Console } from "../Console/Console";
import { Database } from "../Database/include";
import { Manager } from "../Manager/Manager";
import { Behavior, Resource } from "../Types/Minecraft/include";

export function Traverse(): void {
  Console.Log("Traversing starting...");
  Manager.State.TraversingProject = true;
  Manager.State.DataGathered = false;

  Database.MinecraftProgramData.GetProjecData(TraverseProject);
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
