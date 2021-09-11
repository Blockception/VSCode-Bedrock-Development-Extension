import { Diagnoser } from "bc-minecraft-bedrock-diagnoser";
import { ProjectData } from "bc-minecraft-bedrock-project";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { Console } from "../Console/Console";
import { CreateDiagnoser } from "../Diagnostics/Diagnoser";
import { WorkspaceData } from "./Types/WorkspaceData";

/** */
export class Database {
  /** */
  static ProjectData: ProjectData = new ProjectData();

  /** */
  static WorkspaceData: WorkspaceData = new WorkspaceData();

  /** */
  static Diagnoser: Diagnoser = CreateDiagnoser();

  /**
   *
   */
  static Clear(): void {
    Console.Info("Reseting database");
    Database.ProjectData = new ProjectData();
    Database.WorkspaceData = new WorkspaceData();
    Database.Diagnoser = CreateDiagnoser();
  }
}

export namespace Database {
  export function FindReference(id: string, callbackfn: (id: Identifiable) => void) {
    //TODO search the database for anything that matches the ID
  }
}
