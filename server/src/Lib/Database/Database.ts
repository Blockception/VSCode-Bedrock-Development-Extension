import { Diagnoser } from "bc-minecraft-bedrock-diagnoser";
import { ProjectData } from "bc-minecraft-bedrock-project";
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
