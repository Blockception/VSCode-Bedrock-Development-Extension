import { Manifest } from "../../Manifest/include";
import { DiagnoseContext } from "../../../../Diagnostics/Types/include";

export function DiagnoseManifest(data: DiagnoseContext): void {
  let Behaviorpacks: Manifest[] = [];
  let Resourcepacks: Manifest[] = [];
  let Worldpacks: Manifest[] = [];

  const ps = data.projectStructure;

  ps.BehaviourPackFolders.forEach((f) => Get(f, Behaviorpacks));
  ps.ResourcePackFolders.forEach((f) => Get(f, Resourcepacks));
  ps.WorldFolders.forEach((f) => Get(f, Worldpacks));
}

function Get(folder: string, receiver: Manifest[]): void {
  let M = Manifest.GetManifest(folder + "manifest.json");

  if (M) {
    receiver.push(M);
  }
}
