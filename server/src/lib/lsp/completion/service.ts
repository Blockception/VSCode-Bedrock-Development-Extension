import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import {
  CancellationToken,
  CompletionItem,
  CompletionList,
  CompletionParams,
  InitializeParams,
  ResponseError,
} from "vscode-languageserver-protocol";
import { IService } from "../services/service";
import { IExtendedLogger } from "../logger/logger";
import { CapabilityBuilder } from "../services/capabilities";
import { BaseService } from "../services/base";
import { onCompletionRequest } from ".";
import { ErrorCodes } from "../../constants/errors";
import { ExtensionContext } from "../extension/context";
import { Database } from "../database";
import { getFilename } from "../../util";

const triggerCharacters = " abcdefghijklmnopqrstuvwxyz[]{}:.@=+-*/\\|!#$%^&*()<>?,'\"".split("");

export class CompletionService extends BaseService implements Partial<IService> {
  readonly name: string = "completion";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[completion]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams, connection: Connection): void {
    this.extension.capabilities.completion = true;

    capabilities.addCompletion({
      resolveProvider: false,
      triggerCharacters: triggerCharacters,
    });

    // register function
    this.addDisposable(
      connection.onCompletion(this.onCompletion.bind(this)),
      connection.onCompletionResolve(this.onCompletionResolve.bind(this))
    );
  }

  onCompletionResolve(params: CompletionItem, token: CancellationToken) {
    return params;
  }

  onCompletion(
    params: CompletionParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter
  ): ResponseError<void> | CompletionItem[] | CompletionList | undefined | null {
    const { uri } = params.textDocument;
    const filename = getFilename(uri);
    this.logger.debug(`starting on: ${filename}`, params);
    workDoneProgress.begin(`completion ${filename}`, 0, undefined, true);

    try {
      const document = this.extension.documents.get(uri);
      if (document === undefined) return;

      return onCompletionRequest(document, params, token, workDoneProgress, this.logger, Database.ProjectData);
    } catch (err: any) {
      const code = ErrorCodes.CompletionService + (err.code ?? 0);

      return new ResponseError<void>(code, `error on ${filename}, error: ` + JSON.stringify(err, undefined, 2));
    } finally {
      this.logger.debug(`exiting on: ${filename}`);
      workDoneProgress.done();
    }
  }
}
