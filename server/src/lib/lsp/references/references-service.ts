import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import { CancellationToken, InitializeParams, Location, ReferenceParams } from "vscode-languageserver-protocol";
import { ExtensionContext } from "../extension/context";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { Languages } from "@blockception/shared";
import { Context } from "../context/context";
import { ReferenceContext } from "./context";

import * as Mcfunction from "./minecraft/mcfunctions";
import * as Json from "./minecraft/json";

export class ReferenceService extends BaseService implements Pick<IService, "onInitialize"> {
  name: string = "references";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[references]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams, connection: Connection): void {
    capabilities.set("referencesProvider", {
      workDoneProgress: true,
    });

    this.addDisposable(connection.onReferences(this.onReferences.bind(this)));
  }

  private async onReferences(
    params: ReferenceParams,
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
    }

    return undefined;
  }
}
