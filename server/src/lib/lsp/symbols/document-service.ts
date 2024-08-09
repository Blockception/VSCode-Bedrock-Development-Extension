import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import { ExtensionContext } from "../extension";
import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types";
import { getFilename, Vscode } from "../../util";
import { IExtendedLogger } from "../logger/logger";
import { IService } from "../services/service";
import { Kinds } from "../../constants";
import { SymbolBuilder } from "./builder";
import {
  CancellationToken,
  DocumentSymbol,
  DocumentSymbolParams,
  InitializeParams,
  SymbolInformation,
  SymbolKind,
} from "vscode-languageserver-protocol";

export class DocumentSymbolService extends BaseService implements Partial<IService> {
  readonly name: string = "document-symbols";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[document-symbols]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams): void {
    capabilities.set("documentSymbolProvider", {
      label: "minecraft",
      workDoneProgress: true,
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.onDocumentSymbol(this.onDocumentSymbol.bind(this)));
  }

  async onDocumentSymbol(
    params: DocumentSymbolParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter
  ): Promise<SymbolInformation[] | DocumentSymbol[]> {
    const builder = new SymbolBuilder(undefined, token);
    const data = this.extension.database.ProjectData;
    const uri = Vscode.FromFs(params.textDocument.uri);
    workDoneProgress.begin("document symbols", 0, "", true);

    const check = (obj: GeneralInfo) => {
      if (obj.location.uri === uri) {
        builder.add(obj);
      }
    };

    builder.kind = Kinds.Symbol.FakeEntity;
    data.general.fakeEntities.forEach(check);

    builder.kind = Kinds.Symbol.Objectives;
    data.general.objectives.forEach(check);

    builder.kind = Kinds.Symbol.Structure;
    data.general.structures.forEach(check);

    builder.kind = Kinds.Symbol.Tag;
    data.general.tags.forEach(check);

    builder.kind = Kinds.Symbol.Tickingarea;
    data.general.tickingAreas.forEach(check);

    if (uri.endsWith(".json")) return builder.items;

    const filename = getFilename(uri);
    if (filename !== "") builder.new(filename, SymbolKind.Class);

    workDoneProgress.done();
    return builder.items;
  }
}
