import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import { CancellationToken, CodeLens, CodeLensParams } from "vscode-languageserver-protocol";
import { Context } from "../context/context";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { CodeLensContext } from "./context";
import { internalRequest } from "./on-request";

export class CodeLensService extends BaseService implements Partial<IService> {
  name: string = "code-lens";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[code-lens]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder): void {
    capabilities.set("codeLensProvider", {
      resolveProvider: true,
      workDoneProgress: true,
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(
      connection.onCodeLens(this.onCodeLens.bind(this)),
      connection.onCodeLensResolve(this.onCodeLensResolve.bind(this))
    );
  }

  private onCodeLensResolve(code: CodeLens) {
    return code;
  }

  private async onCodeLens(
    params: CodeLensParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter
  ): Promise<CodeLens[] | undefined | null> {
    if (this.extension.settings.Plugin.CodeLens === false) return;

    const document = this.extension.documents.get(params.textDocument.uri);
    if (document === undefined) return;
    this.logger.info("checking code lens", params);

    const context = Context.create<CodeLensContext>(
      this.extension,
      {
        document,
        token,
        workDoneProgress,
      },
      {
        logger: this.logger,
      }
    );

    return internalRequest(context, params);
  }
}
