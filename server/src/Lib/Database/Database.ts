import { Diagnoser } from "bc-minecraft-bedrock-diagnoser";
import { ProjectData } from "bc-minecraft-bedrock-project";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { CreateContext, CreateDiagnoser } from "../Diagnostics/Diagnoser";
import { Console } from "../Manager/Console";
import { WorkspaceData } from "./Types/WorkspaceData";

/** */
export class Database {
  /** */
  static ProjectData: ProjectData = new ProjectData(CreateContext());

  /** */
  static WorkspaceData: WorkspaceData = new WorkspaceData();

  /** */
  static Diagnoser: Diagnoser = CreateDiagnoser();

  /**
   *
   */
  static Clear(): void {
    Console.Info("Reseting database");
    Database.WorkspaceData = new WorkspaceData();
    Database.Diagnoser = CreateDiagnoser();
    Database.ProjectData = new ProjectData(CreateContext());
  }
}

/**
 *
 */
export namespace Database {
  /**
   *
   * @param id
   * @param callbackfn
   */
  export function FindReference(id: string, callbackfn: (id: Identifiable) => void) {
    //TODO search the database for anything that matches the ID
  }
}
