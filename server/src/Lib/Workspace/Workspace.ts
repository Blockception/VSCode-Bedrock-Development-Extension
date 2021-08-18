import { Pack } from "bc-minecraft-bedrock-project";
import { Console } from "../Console/Console";
import { Database } from "../include";

export namespace Workspace {
  /**
   *
   * @returns
   */
  export async function GetWorkSpaces(): Promise<WorkspaceFolder[] | null> {
    const WS = Manager.Connection.workspace.getWorkspaceFolders();

    WS.catch((item) => Console.Error(`No workspaces folders received: ${JSON.stringify(item)}`));

    return WS;
  }

  export function RemoveWorkspace(uri: string): void {
    Console.Info("deleting workspace data: " + uri);
    Database.Database.WorkspaceData.Remove(uri);

    const PD = Database.Database.ProjectData;

    RemoveFromPacks(PD.BehaviorPacks.packs, uri, PD.BehaviorPacks.delete);
    RemoveFromPacks(PD.ResourcePacks.packs, uri, PD.ResourcePacks.delete);
    PD.General.fakeEntities.deleteFile(uri);
  }

  function RemoveFromPacks(packs: Pack[], uri: string, deletefn: (folder: string) => boolean): void {
    for (var I = 0; I < packs.length; I++) {
      const p = packs[I];

      if (p.folder.startsWith(uri)) deletefn(p.folder);
    }
  }
}
