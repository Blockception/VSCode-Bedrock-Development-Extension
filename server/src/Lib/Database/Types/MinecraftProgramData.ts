import { GetProjectFiles, ProjectFiles } from "../../Code/include";
import { FindBedrockInstallationFolder } from "../../Format/Install Location";

export class MinecraftProgramData {
  /** */
  private BedrockInstallLocation: string | undefined;
  /** */
  private ProjectFiles: ProjectFiles | undefined;

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
  public GetProjecData(callback: ((data: ProjectFiles) => void) | undefined = undefined): ProjectFiles | undefined {
    this.LoadProjectFiles(callback);

    return this.ProjectFiles;
  }

  /**
   * Loads project data
   * @param callback
   */
  public LoadProjectFiles(callback: ((data: ProjectFiles) => void) | undefined): void {
    GetProjectFiles().then((x) => {
      if (x) {
        this.ProjectFiles = x;

        if (callback) {
          callback(x);
        }
      }
    });
  }
}
