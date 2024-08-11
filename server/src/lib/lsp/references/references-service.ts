import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import { CancellationToken, InitializeParams, Location, ReferenceParams } from "vscode-languageserver-protocol";
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

export class ReferenceService extends BaseService implements Partial<IService> {
  name: string = "references";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[references]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams): void {
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
