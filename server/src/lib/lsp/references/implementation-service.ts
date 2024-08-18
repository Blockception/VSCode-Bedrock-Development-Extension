import { Languages } from "@blockception/shared";
import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import {
  CancellationToken,
  Definition,
  DefinitionLink,
  ImplementationParams
} from "vscode-languageserver-protocol";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { getCurrentWord } from "./function";

export class ImplementationService extends BaseService implements Partial<IService> {
  name: string = "implementation";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[implementation]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder): void {
    capabilities.set("implementationProvider", {
      documentSelector: [
        { language: Languages.JsonCIdentifier },
        { language: Languages.JsonIdentifier },
        { language: Languages.McFunctionIdentifier },
        { language: Languages.McLanguageIdentifier },
        { language: Languages.McMolangIdentifier },
        { language: Languages.McOtherIdentifier },
        { language: Languages.McProjectIdentifier },
      ],
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.onImplementation(this.onImplementation.bind(this)));
  }

  private async onImplementation(
    params: ImplementationParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter
  ): Promise<Definition | DefinitionLink[] | undefined | null> {
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
