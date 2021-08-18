import { ProjectData } from "bc-minecraft-bedrock-project";
import { Console } from "../Console/Console";
import { Data } from "../include";
import { WorkspaceData } from "./Types/WorkspaceData";

/** */
export class Database {
  /** */
  static ProjectData: ProjectData = new ProjectData();

  /** */
  static WorkspaceData: WorkspaceData = new WorkspaceData();

  /**
   *
   */
  static Clear(): void {
    Console.Info("Reseting database");
    Database.ProjectData = new ProjectData();
    Database.WorkspaceData = new WorkspaceData();
  }
}
