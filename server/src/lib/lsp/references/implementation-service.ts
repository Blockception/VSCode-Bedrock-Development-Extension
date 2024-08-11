import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import {
  CancellationToken,
  Definition,
  DefinitionLink,
  ImplementationParams,
  InitializeParams,
} from "vscode-languageserver-protocol";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { Languages } from "@blockception/shared";
import { ReferenceContext } from "./context";
import { Context } from "../context/context";

import * as Mcfunction from "./minecraft/mcfunctions";
import * as Json from "./minecraft/json";

export class ImplementationService extends BaseService implements Partial<IService> {
  name: string = "implementation";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[implementation]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams): void {
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

    const context: Context<ReferenceContext> = Context.create(
      this.extension,
      {
        ...params,
        document,
        token,
        workDoneProgress,
      },
      { logger: this.logger }
    );

    switch (document.languageId) {
      case Languages.McFunctionIdentifier:
        return Mcfunction.provideReferences(context);

      case Languages.JsonCIdentifier:
      case Languages.JsonIdentifier:
        return Json.provideReferences(context);

      case Languages.McOtherIdentifier:
        break;
    }

    return [];
  }
}
