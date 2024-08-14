import { Languages } from "@blockception/shared";
import { BulkRegistration, Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import {
  CancellationToken,
  InitializeParams,
  Range,
  SemanticTokensParams,
  SemanticTokensRangeParams,
  SemanticTokensRegistrationType,
  SemanticTokens as VSSemanticsTokens,
} from "vscode-languageserver-protocol";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { SemanticModifiers, SemanticTokens } from "./constants";
import { provideJsonSemanticTokens } from "./minecraft/json";
import { provideMolangSemanticTokens } from "./minecraft/molang";

import * as Mcfunction from "./minecraft/mcfunctions";

export class SemanticsServer extends BaseService implements Partial<IService> {
  name: string = "definitions";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[definitions]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams): void {
    capabilities.set("definitionProvider", {
      workDoneProgress: true,
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(
      connection.languages.semanticTokens.on(this.onProvideSemanticRequest.bind(this)),
      connection.languages.semanticTokens.onRange(this.onProvideSemanticRequest.bind(this))
    );
  }

  dynamicRegister(register: BulkRegistration): void {
    register.add(SemanticTokensRegistrationType.type, {
      documentSelector: [
        { language: Languages.JsonCIdentifier },
        { language: Languages.JsonIdentifier },
        { language: Languages.McFunctionIdentifier },
        { language: Languages.McLanguageIdentifier },
        { language: Languages.McOtherIdentifier },
        { language: Languages.McMolangIdentifier },
      ],
      legend: {
        tokenModifiers: SemanticModifiers,
        tokenTypes: SemanticTokens,
      },
      range: true,
      full: true,
    });
  }

  private async onProvideSemanticRequest(
    params: SemanticTokensRangeParams | SemanticTokensParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter
  ): Promise<VSSemanticsTokens> {
    const uri = params.textDocument.uri;
    if (!uri.startsWith("file://")) return { data: [] };

    const document = this.extension.documents.get(uri);
    if (!document) return { data: [] };

    // TODO: context object

    let range: Range | undefined = undefined;

    if (IsSemanticTokensRangeParams(params)) {
      range = params.range;
    }

    switch (document.languageId) {
      case Languages.JsonCIdentifier:
      case Languages.JsonIdentifier:
        return provideJsonSemanticTokens(document, range);

      case Languages.McFunctionIdentifier:
        return Mcfunction.provideSemanticToken(document, range);

      case Languages.McMolangIdentifier:
        return provideMolangSemanticTokens(document, range);

      case Languages.McOtherIdentifier:
      case Languages.McLanguageIdentifier:
        break;
    }

    return { data: [] };
  }
}

function IsSemanticTokensRangeParams(
  value: SemanticTokensRangeParams | SemanticTokensParams
): value is SemanticTokensRangeParams {
  let temp: any = value;

  if (temp.range && Range.is(temp.range)) return true;

  return false;
}
