import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/project/general/types";
import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import {
  CancellationToken,
  DocumentSymbol,
  DocumentSymbolParams,
  SymbolInformation,
  SymbolKind
} from "vscode-languageserver-protocol";
import { Kinds } from "../../constants";
import { getFilename, Vscode } from "../../util";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { SymbolBuilder } from "./builder";

export class DocumentSymbolService extends BaseService implements Partial<IService> {
  readonly name: string = "document-symbols";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[document-symbols]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder): void {
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
    const data = this.extension.database.projectData;
    const uri = Vscode.fromFs(params.textDocument.uri);
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
