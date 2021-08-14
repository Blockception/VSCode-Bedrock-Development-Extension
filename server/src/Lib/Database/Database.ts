import { ProjectData } from "bc-minecraft-bedrock-project";
import { WorkspaceData } from "./Types/WorkspaceData";

/** */
export class Database {
  /** */
  static ProjectData: ProjectData = new ProjectData();

  /** */
  static WorkspaceData: WorkspaceData = new WorkspaceData();
}
