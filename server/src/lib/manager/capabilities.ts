import { ClientCapabilities } from "vscode-languageserver";

/**
 *
 */
export class ExtensionCapabilities {
  /**
   *
   */
  public hasConfigurationCapability: boolean = false;
  /**
   *
   */
  public hasWorkspaceFolderCapability: boolean = false;
  /**
   *
   */
  public hasDiagnosticRelatedInformationCapability: boolean = false;
  /**
   *
   */
  public TraversedWorkspaces: boolean = false;

  /**
   *
   * @param capabilities
   */
  public Parse(capabilities: ClientCapabilities): void {
    // Does the client support the `workspace/configuration` request?
    // If not, we fall back using global settings.
    this.hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
    this.hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
    this.hasDiagnosticRelatedInformationCapability = !!(
      capabilities.textDocument &&
      capabilities.textDocument.publishDiagnostics &&
      capabilities.textDocument.publishDiagnostics.relatedInformation
    );
  }
}
