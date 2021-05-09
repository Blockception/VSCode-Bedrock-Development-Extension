import { CollectedData } from "./Types/CollectedData";
import { DiagnosticCollector } from "./Types/DiagnoticsCollector";
import { MinecraftProgramData } from "./Types/MinecraftProgramData";
import { WorkspaceData } from "./Types/WorkspaceData";

export class Database {
  /**
   * The collected data from any processing
   */
  static Data = new CollectedData();

  /**
   *
   */
  static MinecraftProgramData: MinecraftProgramData = new MinecraftProgramData();

  /**
   *
   */
  static WorkspaceData: WorkspaceData = new WorkspaceData();
}
