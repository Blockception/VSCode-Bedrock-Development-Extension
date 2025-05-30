import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import {
  CancellationToken,
  CompletionItem,
  CompletionList,
  CompletionParams,
  ResponseError
} from "vscode-languageserver-protocol";
import { ErrorCodes } from "../../constants";
import { getFilename } from "../../util";
import { Context } from "../context/context";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { createBuilder } from "./builder/builder";
import { CompletionContext } from "./context";
import { onCompletionRequest } from "./on-request";

const triggerCharacters = " abcdefghijklmnopqrstuvwxyz[]{}:.@=+-*/\\|!#$%^&*()<>?,'\"".split("");

export class CompletionService extends BaseService implements Partial<IService> {
  readonly name: string = "completion";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[completion]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder): void {
    this.extension.capabilities.server.completion = true;

    capabilities.addCompletion({
      resolveProvider: false,
      triggerCharacters: triggerCharacters,
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(
      connection.onCompletion(this.onCompletion.bind(this)),
      connection.onCompletionResolve(this.onCompletionResolve.bind(this))
    );
  }

  onCompletionResolve(params: CompletionItem) {
    return params;
  }

  onCompletion(
    params: CompletionParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter
  ): ResponseError<void> | CompletionItem[] | CompletionList | undefined | null {
    const filename = getFilename(params.textDocument.uri);

    try {
      const document = this.extension.documents.get(params.textDocument.uri);
      const pos = params.position;
      if (document === undefined) return;

      this.logger.debug(`starting on: ${filename}`, params);
      workDoneProgress.begin(`completion ${filename}`, 0, undefined, true);

      const context = Context.create<CompletionContext>(
        this.extension,
        {
          document,
          token,
          workDoneProgress,
          cursor: document.offsetAt(pos),
          builder: createBuilder(token, workDoneProgress),
          ...params,
        },
        { logger: this.logger }
      );

      onCompletionRequest(context);

      return {
        isIncomplete: false,
        items: removeDuplicate(context.builder.getItems()),
      };
    } catch (err: any) {
      const code = ErrorCodes.CompletionService + (err.code ?? 0);
      
      // Somehow just stringifying the error returns an empty object, so I make sure message and stack are always there
      return new ResponseError<void>(code, `error on ${filename}, error: ` + JSON.stringify({...err, message: err.message, stack: err.stack}, undefined, 2));
    } finally {
      this.logger.debug(`exiting on: ${filename}`);
      workDoneProgress.done();
    }
  }
}

function removeDuplicate(items: CompletionItem[]): CompletionItem[] {
  const Length = items.length;
  const out: CompletionItem[] = [];

  for (let I = 0; I < Length; I++) {
    const current = items[I];

    if (!hasItem(out, current)) {
      out.push(current);
    }
  }

  return out;
}

function hasItem(items: CompletionItem[], item: CompletionItem): boolean {
  const label = item.label;

  for (let I = 0; I < items.length; I++) {
    if (label == items[I].label) return true;
  }

  return false;
}
