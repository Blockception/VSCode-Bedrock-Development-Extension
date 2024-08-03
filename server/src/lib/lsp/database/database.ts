import { CancellationToken } from "vscode-languageserver-protocol";
import { IDocumentManager } from "../documents/manager";
import { IExtendedLogger } from "../logger/logger";
import { InternalContext } from "../diagnostics/context";
import { IService } from "../services/service";
import { ParameterType } from "bc-minecraft-bedrock-command";
import { ProjectData } from "bc-minecraft-bedrock-project";
import { QueueProcessor } from "@daanv2/queue-processor";
import { Types } from "bc-minecraft-bedrock-types";
import { WorkspaceData } from "./workspace-data";

type BaseObject = Types.BaseObject;

export interface forEachfn<T> {
  forEach(callbackfn: (value: Types.BaseObject) => void): void;
}

export class Database implements Pick<IService, "name"> {
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
  findReference(id: string): BaseObject | undefined {
    return this.ProjectData.find((item) => item.id === id);
  }

  /**
   *
   * @param id
   * @param callbackfn
   */
  findReferences(id: string, Types: ParameterType[] | undefined = undefined): BaseObject[] {
    if (Types) return this.internalTypeSearch(id, Types);

    return this.internalSearchAll(id);
  }

  private internalSearchAll(id: string): BaseObject[] {
    return [];
  }

  private internalTypeSearch(id: string, Types: ParameterType[]): BaseObject[] {
    const out: BaseObject[] = [];
    const AddIfIDMatch = (item: BaseObject) => {
      if (item.id === id) out.push(item);
    };

    for (let I = 0; I < Types.length; I++) {
      const T = Types[I];

      switch (T) {
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
          break;

        case ParameterType.event:
          this.ProjectData.behaviorPacks.entities.forEach((entity) => {
            entity.events.forEach((event) => {
              if (event === id) out.push(entity);
            });
          });
          break;

        case ParameterType.event:
          this.ProjectData.behaviorPacks.entities.forEach((entity) => {
            if (entity.families.some((family) => family === id)) {
              out.push(entity);
            }
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

  forEach(callbackfn: (item: BaseObject) => void, token?: CancellationToken): Promise<void> {
    const packs: forEachfn<BaseObject>[][] = [
      [this.ProjectData.general],
      this.ProjectData.behaviorPacks.packs,
      this.ProjectData.resourcePacks.packs,
      this.ProjectData.worlds.packs,
    ];

    return QueueProcessor.forEach<forEachfn<BaseObject>[]>(packs, (pack_col) => {
      if (token?.isCancellationRequested) return;

      return QueueProcessor.forEach<forEachfn<BaseObject>>(pack_col, (pack) => {
        if (token?.isCancellationRequested) return;

        return pack.forEach(callbackfn);
      }).then((items) => {});
    }).then((items) => {});
  }
}
