import { BulkRegistration, Connection } from "vscode-languageserver";
import {
  DidChangeConfigurationNotification,
  DidChangeConfigurationParams,
  InitializeParams,
} from "vscode-languageserver-protocol";
import { ExtensionContext } from "../extension/context";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { Identification } from "@blockception/shared";
import { Settings } from "../extension/settings";
import { GetProject } from "../../project/mcprojects";

export class ConfigurationService
  extends BaseService
  implements Pick<IService, "onInitialize" | "dynamicRegister" | "start">
{
  name: string = "configuration";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[configuration]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams, connection: Connection): void {
    
    this.addDisposable(connection.onDidChangeConfiguration(this.updateSettings.bind(this)));
  }

  dynamicRegister(register: BulkRegistration): void {
    register.add(DidChangeConfigurationNotification.type, {});
  }

  async updateSettings(params?: DidChangeConfigurationParams) {
    this.logger.info("updating settings", params);
    const settings =
      params?.settings ??
      (await this.extension.connection.workspace.getConfiguration(Identification.SettingsConfigurationIdentifier));

    //If settings is nothing then skip it.
    if (settings === undefined || settings === null) return;

    if (Settings.is(settings)) {
      this.extension.settings = settings;

      //Update existing settings
      const workspace = this.extension.database.WorkspaceData;
      workspace.forEach((value, uri) => {
        workspace.set(uri, GetProject(uri));
      });
    }
  }

  start(): void {
    void this.updateSettings();
  }
}
