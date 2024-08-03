import {
  CancellationToken,
  CodeAction,
  CodeActionParams,
  Command,
  Diagnostic,
  InitializeParams,
} from "vscode-languageserver-protocol";
import { attributes } from "./types";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { CodeActionBuilder } from "./builder";
import { CodeActionContext } from "./context";
import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import { Context } from "../context/context";
import { ExtensionContext } from "../extension/context";
import { fuzzyMatch } from "./fuzzy";
import { IExtendedLogger } from "../logger/logger";
import { IService } from "../services/service";

import * as Minecraft from "./minecraft/code-actions";
import * as BehaviorPack from "./minecraft/behavior-pack/main";
import * as ResourcePack from "./minecraft/resource-pack/main";

export class CodeActionService extends BaseService implements Pick<IService, "onInitialize"> {
  name: string = "code-actions";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[code-actions]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams, connection: Connection): void {
    capabilities.set("codeActionProvider", true);

    this.addDisposable(
      connection.onCodeAction(this.onCodeAction.bind(this)),
      connection.onCodeActionResolve(this.onCodeActionResolve.bind(this))
    );
  }

  private onCodeActionResolve(code: CodeAction) {
    return code;
  }

  private async onCodeAction(
    params: CodeActionParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter
  ): Promise<(Command | CodeAction)[] | undefined | null> {
    const document = this.extension.documents.get(params.textDocument.uri);
    if (document === undefined) return;

    this.logger.info("checking code actions", params);

    const context = Context.create<CodeActionContext>(
      this.extension,
      {
        document,
        token,
        workDoneProgress,
        ...params,
      },
      {
        logger: this.logger,
      }
    );

    const builder = new CodeActionBuilder(params, context);
    const promises = params.context.diagnostics.map((d) => this.findAction(builder, d));
    await Promise.all(promises);
    return builder.out;
  }

  async findAction(builder: CodeActionBuilder, diag: Diagnostic): Promise<void> {
    if (builder.context.token.isCancellationRequested) return;

    attributes(builder, diag);

    const code = diag.code ?? "";
    if (typeof code === "number") return;

    const index = code.indexOf(".");
    const mainCode = index > -1 ? code.slice(0, index) : code;

    switch (mainCode) {
      case "behaviorpack":
        BehaviorPack.onCodeAction(builder, diag);
        break;

      case "resourcepack":
        ResourcePack.onCodeAction(builder, diag);
        break;

      case "minecraft":
        Minecraft.onCodeAction(builder, diag);
        break;

      case "mcfunction":
    }

    return fuzzyMatch(builder, diag);
  }
}
