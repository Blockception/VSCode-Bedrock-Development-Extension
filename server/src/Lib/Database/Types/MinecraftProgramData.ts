import { GetProjectData, ProjectData } from "../../Code/ProjectData";
import { FindBedrockInstallationFolder } from "../../Format/Install Location";

export class MinecraftProgramData {
  private BedrockInstallLocation: string | undefined;
  private ProjectData: ProjectData | undefined;

  constructor() {}

  /**
   * Retrieves the bedrock installation folder
   */
  public GetBedrockInstallLocation(): string {
    if (!this.BedrockInstallLocation) this.BedrockInstallLocation = FindBedrockInstallationFolder();

    return this.BedrockInstallLocation;
  }

  /**
   *
   * @param callback
   */
  public GetProjecData(callback: ((data: ProjectData) => void) | undefined = undefined): ProjectData | undefined {
    this.LoadProjectData(callback);

    return this.ProjectData;
  }

  /**
   * Loads project data
   * @param callback
   */
  public LoadProjectData(callback: ((data: ProjectData) => void) | undefined): void {
    GetProjectData().then((x) => {
      if (x) {
        this.ProjectData = x;

        if (callback) {
          callback(x);
        }
      }
    });
  }
}
