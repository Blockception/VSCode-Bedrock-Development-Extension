import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import { CancellationToken, Hover, HoverParams, InitializeParams } from "vscode-languageserver-protocol";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { Languages } from "@blockception/shared";
import { Context } from "../context/context";
import { HoverContext } from "./context";

import * as Json from "./minecraft/json";
import * as Mcfunction from "./minecraft/mcfunction";
import * as Molang from "./minecraft/molang";

export class HoverService extends BaseService implements Partial<IService> {
  name: string = "hover";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[hover]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams): void {
    capabilities.set("hoverProvider", {
      workDoneProgress: true,
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.onHover(this.onHoverRequest.bind(this)));
  }

  private async onHoverRequest(
    params: HoverParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter
  ): Promise<Hover | undefined | null> {
    const document = this.extension.documents.get(params.textDocument.uri);
    if (!document) return undefined;

    const context = Context.create<HoverContext>(
      this.extension,
      { document, params, token, workDoneProgress },
      { logger: this.logger }
    );

    switch (document.languageId) {
      case Languages.McFunctionIdentifier:
        return Mcfunction.provideHover(context);

      case Languages.JsonCIdentifier:
      case Languages.JsonIdentifier:
        return Json.provideHover(context);

      case Languages.McMolangIdentifier:
        return Molang.provideHover(context);

      case Languages.McOtherIdentifier:
        break;
    }

    return undefined;
  }
}
