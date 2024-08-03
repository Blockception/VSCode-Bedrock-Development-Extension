import {
  DocumentFormattingParams,
  DocumentFormattingRequest,
  DocumentRangeFormattingParams,
  Emitter,
  InitializeParams,
  TextEdit,
} from "vscode-languageserver-protocol";
import { ExtensionContext } from "../extension/context";
import { IExtendedLogger } from "../logger/logger";
import { PackProcessor } from "../process/pack-processor";
import { BaseService } from "../services/base";
import { IService } from "../services/service";
import { TextDocument } from "../documents/text-document";
import { BulkRegistration, Connection } from "vscode-languageserver";
import { CapabilityBuilder } from "../services/capabilities";
import { Languages } from "@blockception/shared";
import { formatMcfunction, formatMcfunctionRange } from "./mcfunction";
import { formatLangauge, formatLangaugeRange } from "./language";

export class FormatService extends BaseService implements Pick<IService, "onInitialize" | "dynamicRegister"> {
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

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams, connection: Connection): void {
    this.addDisposable(
      connection.onDocumentFormatting(this.onDocumentFormatting.bind(this)),
      connection.onDocumentRangeFormatting(this.onDocumentRangeFormatting.bind(this))
    );
  }

  async onDocumentFormatting(params: DocumentFormattingParams): Promise<TextEdit[] | undefined | null> {
    const doc = this.extension.documents.get(params.textDocument.uri);
    if (!doc) return null;

    switch (doc.languageId) {
      case Languages.McFunctionIdentifier:
        return formatMcfunction(doc, params);

      case Languages.McLanguageIdentifier:
        return formatLangauge(doc, params);

      case Languages.JsonCIdentifier:
      case Languages.JsonIdentifier:
        break;
    }

    return undefined;
  }

  async onDocumentRangeFormatting(params: DocumentRangeFormattingParams): Promise<TextEdit[] | undefined | null> {
    const doc = this.extension.documents.get(params.textDocument.uri);
    if (!doc) return undefined;

    switch (doc.languageId) {
      case Languages.McFunctionIdentifier:
        return formatMcfunctionRange(doc, params);

      case Languages.McLanguageIdentifier:
        return formatLangaugeRange(doc, params);

      case Languages.JsonCIdentifier:
      case Languages.JsonIdentifier:
      default:
    }

    return [];
  }
}
