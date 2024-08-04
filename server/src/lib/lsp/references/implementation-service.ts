import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import { CancellationToken, Definition, DefinitionLink, ImplementationParams, InitializeParams, Location, ReferenceParams } from "vscode-languageserver-protocol";
import { ExtensionContext } from "../extension/context";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { Languages } from "@blockception/shared";

import * as Mcfunction from "./minecraft/mcfunctions";
import * as Json from "./minecraft/json";
import { ReferenceContext } from './context';
import { Context } from '../context/context';

export class ImplementationService extends BaseService implements Pick<IService, "onInitialize"> {
  name: string = "implementation";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[implementation]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams, connection: Connection): void {
    capabilities.set("implementationProvider", {
      documentSelector: [
        { scheme: "file", language: Languages.JsonCIdentifier },
        { scheme: "file",language: Languages.JsonIdentifier },
        { scheme: "file",language: Languages.McFunctionIdentifier },
        { scheme: "file",language: Languages.McLanguageIdentifier },
        { scheme: "file",language: Languages.McMolangIdentifier },
        { scheme: "file",language: Languages.McOtherIdentifier },
        { scheme: "file",language: Languages.McProjectIdentifier },
      ],
    });

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
