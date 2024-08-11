import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import { CancellationToken, Definition, DefinitionLink, InitializeParams, Location, ReferenceParams, TypeDefinitionParams } from "vscode-languageserver-protocol";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { Languages } from "@blockception/shared";
import { Context } from "../context/context";
import { ReferenceContext } from "./context";

import * as Mcfunction from "./minecraft/mcfunctions";
import * as Json from "./minecraft/json";
import { getCurrentWord } from './function';

export class TypeDefinitionService extends BaseService implements Partial<IService> {
  name: string = "type-definitions";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[type-definitions]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams): void {
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
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.onTypeDefinition(this.onTypeDefinition.bind(this)));
  }

  private async onTypeDefinition(
    params: TypeDefinitionParams,
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
