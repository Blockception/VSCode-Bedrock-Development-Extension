import { CancellationToken, Connection, Location, ReferenceParams, WorkDoneProgressReporter } from "vscode-languageserver";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { getCurrentWord } from './function';

export class ReferenceService extends BaseService implements Partial<IService> {
  name: string = "references";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[references]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder): void {
    capabilities.set("referencesProvider", {
      workDoneProgress: true,
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.onReferences(this.onReferences.bind(this)));
  }

  private async onReferences(
    params: ReferenceParams,
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
      { defined: true, usage: true },
      token,
      workDoneProgress
    );

    workDoneProgress.done();

    return locations;
  }
}
