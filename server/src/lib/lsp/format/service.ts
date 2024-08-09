import {
  CancellationToken,
  DocumentFormattingParams,
  DocumentFormattingRequest,
  DocumentRangeFormattingParams,
  TextEdit,
} from "vscode-languageserver-protocol";
import { BaseService } from "../services/base";
import { BulkRegistration, Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import { Context } from "../context/context";
import { ExtensionContext } from "../extension";
import { FormatContext } from "./context";
import { formatLangauge, formatLangaugeRange } from "./language";
import { formatMcfunction, formatMcfunctionRange } from "./mcfunction";
import { IExtendedLogger } from "../logger/logger";
import { IService } from "../services/service";
import { Languages } from "@blockception/shared";

export class FormatService extends BaseService implements Partial<IService> {
  name: string = "workspace processor";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[formatter]"), extension);
  }

  dynamicRegister(register: BulkRegistration): void {
    // Tell the client that this server supports code formatting.
    register.add(DocumentFormattingRequest.type, {
      documentSelector: [
        { scheme: "file", language: Languages.McFunctionIdentifier },
        { scheme: "file", language: Languages.McLanguageIdentifier },
      ],
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(
      connection.onDocumentFormatting(this.onDocumentFormatting.bind(this)),
      connection.onDocumentRangeFormatting(this.onDocumentRangeFormatting.bind(this))
    );
  }

  async onDocumentFormatting(
    params: DocumentFormattingParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter
  ): Promise<TextEdit[] | undefined | null> {
    const document = this.extension.documents.get(params.textDocument.uri);
    if (!document) return null;

    const context = Context.create<FormatContext>(
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

    switch (document.languageId) {
      case Languages.McFunctionIdentifier:
        return formatMcfunction(context, params);

      case Languages.McLanguageIdentifier:
        return formatLangauge(context, params);

      case Languages.JsonCIdentifier:
      case Languages.JsonIdentifier:
        break;
    }

    return undefined;
  }

  async onDocumentRangeFormatting(
    params: DocumentRangeFormattingParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter
  ): Promise<TextEdit[] | undefined | null> {
    const document = this.extension.documents.get(params.textDocument.uri);
    if (!document) return undefined;

    const context = Context.create<FormatContext>(
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

    switch (document.languageId) {
      case Languages.McFunctionIdentifier:
        return formatMcfunctionRange(context, params);

      case Languages.McLanguageIdentifier:
        return formatLangaugeRange(context, params);

      case Languages.JsonCIdentifier:
      case Languages.JsonIdentifier:
      default:
    }

    return [];
  }
}
