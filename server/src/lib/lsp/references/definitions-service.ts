import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { Languages } from "@blockception/shared";
import { Context } from "../context/context";
import { ReferenceContext } from "./context";
import {
  CancellationToken,
  DefinitionParams,
  InitializeParams,
  Location,
} from "vscode-languageserver-protocol";

import * as Mcfunction from "./minecraft/mcfunctions";
import * as Json from "./minecraft/json";

export class DefinitionService extends BaseService implements Partial<IService> {
  name: string = "definitions";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[definitions]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams): void {
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
