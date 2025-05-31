import { DatabaseParams, DatabaseQueryRequest } from "@blockception/shared";
import { ParameterType } from "bc-minecraft-bedrock-command";
import { IDataSet, ProjectData } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
import { BulkRegistration, Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import { CancellationToken, Location } from "vscode-languageserver-protocol";
import { Processor, References } from "../../util";
import { InternalContext } from "../diagnostics/context";
import { IDocumentManager } from "../documents/manager";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { IService } from "../services/service";
import { Options, ReferenceBuilder } from "./references";
import { WorkspaceData } from "./workspace-data";

type BaseObject = Types.BaseObject;

export interface forEachfn<T extends Types.BaseObject> {
  forEach(callbackfn: (value: T) => void): void;
}

export class Database extends BaseService implements Partial<IService> {
  readonly name: string = "database";
  public projectData: ProjectData;
  public workspaceData: WorkspaceData;
  public context: InternalContext;

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[database]"), extension);

    this.context = new InternalContext(this.logger, extension.documents, () => this.projectData);
    this.workspaceData = new WorkspaceData();
    this.projectData = new ProjectData(this.context);
  }

  /**
   *
   */
  clear(): void {
    this.logger.info("clearing database");
    this.workspaceData.clear();
    this.projectData = new ProjectData(this.context);
  }

  getPacks() {
    return [
      ...this.projectData.behaviorPacks.packs,
      ...this.projectData.resourcePacks.packs,
      ...this.projectData.worlds.packs,
    ];
  }

  /**
   *
   * @param id
   * @param callbackfn
   */
  async findReference(
    id: string,
    documents: IDocumentManager,
    options?: Options,
    token?: CancellationToken,
    workDoneProgress?: WorkDoneProgressReporter
  ): Promise<Location[]> {
    const builder = new ReferenceBuilder(documents, { defined: true, usage: false, ...(options || {}) }, token);
    await this.forEach((item) => builder.findReference(item, id), token, workDoneProgress);

    return References.convertLocation(builder.locations, documents);
  }

  /**
   *
   * @param id
   * @param callbackfn
   */
  async findReferences(
    id: string,
    types: ParameterType[] | undefined = undefined,
    token?: CancellationToken,
    workDoneProgress?: WorkDoneProgressReporter
  ): Promise<BaseObject[]> {
    if (types) return this.internalTypeSearch(id, types, token, workDoneProgress);

    return this.internalSearchAll(id, token, workDoneProgress);
  }

  private async internalSearchAll(
    id: string,
    token?: CancellationToken,
    workDoneProgress?: WorkDoneProgressReporter
  ): Promise<Types.BaseObject[]> {
    const result: BaseObject[] = [];

    await this.forEach(
      (item) => {
        if (item.id === id) result.push(item);
      },
      token,
      workDoneProgress
    );

    return result;
  }

  private internalTypeSearch(
    id: string,
    types: ParameterType[],
    token?: CancellationToken,
    workDoneProgress?: WorkDoneProgressReporter
  ): BaseObject[] {
    const out: BaseObject[] = [];
    const AddIfIDMatch = (item: BaseObject) => {
      if (item.id === id) out.push(item);
    };

    for (let i = 0; i < types.length; i++) {
      const item = types[i];
      if (token?.isCancellationRequested) break;
      workDoneProgress?.report(i / types.length, `checking type: ${ParameterType[item]}`);

      switch (item) {
        case ParameterType.animation:
          this.projectData.resourcePacks.entities.forEach((entity) => {
            entity.animations.defined.forEach((anim) => {
              if (anim === id) out.push(entity);
            });
          });
          this.projectData.resourcePacks.animations.forEach(AddIfIDMatch);
          this.projectData.resourcePacks.animation_controllers.forEach(AddIfIDMatch);
          break;

        case ParameterType.block:
          this.projectData.behaviorPacks.blocks.forEach(AddIfIDMatch);
          break;

        case ParameterType.entity:
          this.projectData.behaviorPacks.entities.forEach(AddIfIDMatch);
          this.projectData.resourcePacks.entities.forEach(AddIfIDMatch);
          break;

        case ParameterType.event:
          this.projectData.behaviorPacks.entities.forEach((entity) => {
            entity.events.forEach((event) => {
              if (event === id) out.push(entity);
            });
          });
          break;

        case ParameterType.function:
          this.projectData.behaviorPacks.functions.forEach(AddIfIDMatch);
          break;

        case ParameterType.item:
          this.projectData.behaviorPacks.items.forEach(AddIfIDMatch);
          break;

        case ParameterType.objective:
          this.projectData.general.objectives.forEach(AddIfIDMatch);
          break;

        case ParameterType.particle:
          this.projectData.resourcePacks.particles.forEach(AddIfIDMatch);
          break;

        case ParameterType.sound:
          this.projectData.resourcePacks.sounds.forEach(AddIfIDMatch);
          break;

        case ParameterType.structure:
          this.projectData.behaviorPacks.structures.forEach(AddIfIDMatch);
          this.projectData.general.structures.forEach(AddIfIDMatch);
          break;

        case ParameterType.tag:
          this.projectData.general.tags.forEach(AddIfIDMatch);
          break;

        case ParameterType.tickingarea:
          this.projectData.general.tickingAreas.forEach(AddIfIDMatch);
          break;
      }
    }

    return out;
  }

  forEach(
    callbackfn: (item: BaseObject) => void,
    token?: CancellationToken,
    workDoneProgress?: WorkDoneProgressReporter
  ): Promise<void> | void {
    const packs = [
      [this.projectData.general],
      this.projectData.behaviorPacks.packs,
      this.projectData.resourcePacks.packs,
      this.projectData.worlds.packs,
    ];

    return Processor.forEach(
      packs,
      (pack_col) => Processor.forEach<forEachfn<BaseObject>>(pack_col, (pack) => pack.forEach(callbackfn), token),
      token,
      workDoneProgress
    );
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.onRequest(DatabaseQueryRequest.type, this.queryDB.bind(this)));
  }

  dynamicRegister(register: BulkRegistration): void {
    register.add(DatabaseQueryRequest.type, {});
  }

  private async queryDB(params: DatabaseParams): Promise<string[] | null> {
    const t = DatabaseParams.splitType(params);
    if (t === null) {
      throw new Error(`Invalid type definition`);
    }

    const [pt, subt] = t;

    let subset: IDataSet<Types.Identifiable>;
    switch (pt) {
      case "bp":
        subset = this.projectData.behaviorPacks[subt];
        break;

      case "rp":
        subset = this.projectData.resourcePacks[subt];
        break;

      default:
        throw new Error("unknown pack type: " + pt);
    }

    if (subset === null || subset === undefined || typeof subset === "function") {
      throw new Error("unknown type: " + params.type);
    }

    const ids: string[] = [];

    if (params.filter) {
      const r = new RegExp(params.filter, params.flags);

      subset.forEach((item) => {
        if (r.test(item.id)) {
          ids.push(item.id);
        }
      });
    } else {
      subset.forEach((item) => {
        ids.push(item.id);
      });
    }

    return ids;
  }
}
