import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { CancellationToken, InitializeParams, SignatureHelp, SignatureHelpParams } from "vscode-languageserver-protocol";
import { IService } from "../services/service";
import { Languages } from "@blockception/shared";
import { provideJsonSignature } from "./json";

import * as Language from "./minecraft/languages";
import * as Mcfunction from "./minecraft/mcfunctions";
import * as Molang from "./minecraft/molang/main";

const triggerCharacters = " abcdefghijklmnopqrstuvwxyz[]{}:.@=+-*/\\|!#$%^&*()<>?,'\"".split("");

export class SignatureService extends BaseService implements Partial<IService> {
  readonly name: string = "signatures";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[signatures]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams): void {
    capabilities.set("signatureHelpProvider", {
      triggerCharacters: triggerCharacters,
      retriggerCharacters: triggerCharacters,
      workDoneProgress: true,
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.onSignatureHelp(this.onSignatureHelp.bind(this)));
  }

  async onSignatureHelp(
    params: SignatureHelpParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter
  ): Promise<SignatureHelp | undefined> {
    const position = params.position;
    const documents = this.extension.documents.get(params.textDocument.uri);
    if (!documents) return undefined;

    //TODO: use context

    //Switch per language type
    switch (documents.languageId) {
      case Languages.McFunctionIdentifier:
        return Mcfunction.provideSignature(documents, position);

      case Languages.McLanguageIdentifier:
        return Language.provideSignature(documents, position);

      case Languages.McMolangIdentifier:
        return Molang.provideDocSignature(documents, position);

      case Languages.McOtherIdentifier:
        return undefined;

      case Languages.JsonCIdentifier:
      case Languages.JsonIdentifier:
        return provideJsonSignature(documents, position);
    }

    return undefined;
  }
}
