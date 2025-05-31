import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import {
  CancellationToken,
  SymbolInformation,
  WorkspaceSymbolParams
} from "vscode-languageserver-protocol";
import { Kinds } from "../../constants";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { SymbolBuilder } from "./builder";
import { convertBehaviorPacks, convertResourcePack } from "./functions";

export class WorkspaceSymbolService extends BaseService implements Partial<IService> {
  readonly name: string = "workspace-symbols";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[workspace-symbols]"), extension);
  }

  onInitialize(capabilities: CapabilityBuilder): void {
    capabilities.set("workspaceSymbolProvider", {
      resolveProvider: true,
      workDoneProgress: true,
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.onWorkspaceSymbol(this.onWorkspaceSymbol.bind(this)));
  }

  async onWorkspaceSymbol(
    params: WorkspaceSymbolParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter
  ): Promise<SymbolInformation[]> {
    const builder = new SymbolBuilder(params.query, token);
    const data = this.extension.database.projectData;
    workDoneProgress.begin("workspace symbols", 0, "", true);

    //General items
    builder.containerName = "minecraft";
    builder.generate(data.general.fakeEntities, Kinds.Symbol.FakeEntity);
    builder.generate(data.general.objectives, Kinds.Symbol.Objectives);
    builder.generate(data.general.structures, Kinds.Symbol.Structure);
    builder.generate(data.general.tags, Kinds.Symbol.Tag);
    builder.generate(data.general.tickingAreas, Kinds.Symbol.Tickingarea);

    data.resourcePacks.packs.forEach((p) => convertResourcePack(p, builder));
    data.behaviorPacks.packs.forEach((p) => convertBehaviorPacks(p, builder));

    workDoneProgress.done();
    return builder.items;
  }
}
