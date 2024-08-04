import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import { CancellationToken, Definition, DefinitionLink, InitializeParams, Location, ReferenceParams, TypeDefinitionParams } from "vscode-languageserver-protocol";
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

export class TypeDefinitionService extends BaseService implements Pick<IService, "onInitialize"> {
  name: string = "type-definitions";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[type-definitions]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams, connection: Connection): void {
    capabilities.set("typeDefinitionProvider", {
      workDoneProgress: true,
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

    this.addDisposable(connection.onTypeDefinition(this.onTypeDefinition.bind(this)));
  }

  private async onTypeDefinition(
    params: TypeDefinitionParams,
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
