import { CancellationToken, Connection, DefinitionParams, Location, WorkDoneProgressReporter } from "vscode-languageserver";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { getCurrentWord } from "./function";

export class DefinitionService extends BaseService implements Partial<IService> {
  name: string = "definitions";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[definitions]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder): void {
    capabilities.set("definitionProvider", {
      workDoneProgress: true,
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.onDefinition(this.onDefinition.bind(this)));
  }

  private async onDefinition(
    params: DefinitionParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter
  ): Promise<Location[] | undefined> {
    const document = this.extension.documents.get(params.textDocument.uri);
    if (!document) return undefined;

    const cursor = document.offsetAt(params.position);
    const w = getCurrentWord(document, cursor);
    if (w.text === "") {
      return;
    }

    workDoneProgress.begin("searching references");

    const locations = await this.extension.database.findReference(
      w.text,
      this.extension.documents,
      { defined: true, usage: false },
      token,
      workDoneProgress
    );

    workDoneProgress.done();

    return locations;
  }
}
