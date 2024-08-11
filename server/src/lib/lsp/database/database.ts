import { CancellationToken, Location } from "vscode-languageserver-protocol";
import { IDocumentManager } from "../documents/manager";
import { IExtendedLogger } from "../logger/logger";
import { InternalContext } from "../diagnostics/context";
import { IService } from "../services/service";
import { ParameterType } from "bc-minecraft-bedrock-command";
import { ProjectData } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
import { WorkspaceData } from "./workspace-data";
import { WorkDoneProgressReporter } from "vscode-languageserver";
import { Processor, References } from "../../util";
import { Options, ReferenceBuilder } from "./references";

type BaseObject = Types.BaseObject;

export interface forEachfn<T> {
  forEach(callbackfn: (value: Types.BaseObject) => void): void;
}

export class Database implements Partial<IService> {
  readonly name: string = "database";
  public logger: IExtendedLogger;
  public ProjectData: ProjectData;
  public WorkspaceData: WorkspaceData;
  public context: InternalContext;

  constructor(logger: IExtendedLogger, documents: IDocumentManager) {
    this.logger = logger.withPrefix("[database]");

    this.context = new InternalContext(this.logger, documents, () => this.ProjectData);
    this.WorkspaceData = new WorkspaceData();
    this.ProjectData = new ProjectData(this.context);
  }

  /**
   *
   */
  clear(): void {
    this.logger.info("clearing database");
    this.WorkspaceData.clear();
    this.ProjectData;
  }

  getPacks() {
    return [
      ...this.ProjectData.behaviorPacks.packs,
      ...this.ProjectData.resourcePacks.packs,
      ...this.ProjectData.worlds.packs,
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

    await this.forEach((item) => {
      if (item.id === id) result.push(item);
    });

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
          this.ProjectData.resourcePacks.entities.forEach((entity) => {
            entity.animations.defined.forEach((anim) => {
              if (anim === id) out.push(entity);
            });
          });
          this.ProjectData.resourcePacks.animations.forEach(AddIfIDMatch);
          this.ProjectData.resourcePacks.animation_controllers.forEach(AddIfIDMatch);
          break;

        case ParameterType.block:
          this.ProjectData.behaviorPacks.blocks.forEach(AddIfIDMatch);
          break;

        case ParameterType.entity:
          this.ProjectData.behaviorPacks.entities.forEach(AddIfIDMatch);
          this.ProjectData.resourcePacks.entities.forEach(AddIfIDMatch);
          break;

        case ParameterType.event:
          this.ProjectData.behaviorPacks.entities.forEach((entity) => {
            entity.events.forEach((event) => {
              if (event === id) out.push(entity);
            });
          });
          break;

        case ParameterType.function:
          this.ProjectData.behaviorPacks.functions.forEach(AddIfIDMatch);
          break;

        case ParameterType.item:
          this.ProjectData.behaviorPacks.items.forEach(AddIfIDMatch);
          break;

        case ParameterType.objective:
          this.ProjectData.general.objectives.forEach(AddIfIDMatch);
          break;

        case ParameterType.particle:
          this.ProjectData.resourcePacks.particles.forEach(AddIfIDMatch);
          break;

        case ParameterType.sound:
          this.ProjectData.resourcePacks.sounds.forEach(AddIfIDMatch);
          break;

        case ParameterType.structure:
          this.ProjectData.behaviorPacks.structures.forEach(AddIfIDMatch);
          this.ProjectData.general.structures.forEach(AddIfIDMatch);
          break;

        case ParameterType.tag:
          this.ProjectData.general.tags.forEach(AddIfIDMatch);
          break;

        case ParameterType.tickingarea:
          this.ProjectData.general.tickingAreas.forEach(AddIfIDMatch);
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
      [this.ProjectData.general],
      this.ProjectData.behaviorPacks.packs,
      this.ProjectData.resourcePacks.packs,
      this.ProjectData.worlds.packs,
    ];

    return Processor.forEach(
      packs,
      (pack_col) => Processor.forEach<forEachfn<BaseObject>>(pack_col, (pack) => pack.forEach(callbackfn), token),
      token,
      workDoneProgress
    );
  }
}
