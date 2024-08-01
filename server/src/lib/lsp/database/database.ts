import { QueueProcessor } from "@daanv2/queue-processor";
import { ParameterType } from "bc-minecraft-bedrock-command";
import { Diagnoser } from "bc-minecraft-bedrock-diagnoser";
import { ProjectData } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
import { DiagnoserUtility as DiagnoserUtility } from "../diagnostics/diagnoser";
import { Console } from "../../manager/console";
import { WorkspaceData } from "./workspace-data";
import { ExtensionContext } from "../extension/context";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { IService } from "../services/service";
import { DocumentManager } from "../documents/manager";
import { InternalContext } from "../diagnostics/context";

type BaseObject = Types.BaseObject;

export interface forEachfn<T> {
  forEach(callbackfn: (value: Types.BaseObject) => void): void;
}

export class Database implements Pick<IService, "name"> {
  readonly name: string = "database";
  public logger: IExtendedLogger;
  public Diagnoser: Diagnoser;
  public ProjectData: ProjectData;
  public WorkspaceData: WorkspaceData;
  public context: InternalContext;

  constructor(logger: IExtendedLogger, documents: DocumentManager) {
    this.logger = logger.withPrefix("[database]");

    this.context = new InternalContext(this.logger, () => this.ProjectData);
    this.Diagnoser = DiagnoserUtility.createDiagnoser(() => this.ProjectData);
    this.WorkspaceData = new WorkspaceData();
    this.ProjectData = new ProjectData(this.context);
  }

  /**
   *
   */
  clear(): void {
    Console.Info("Resetting database");
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
          this.ProjectData.ResourcePacks.entities.forEach((entity) => {
            entity.animations.defined.forEach((anim) => {
              if (anim === id) out.push(entity);
            });
          });
          this.ProjectData.ResourcePacks.animations.forEach(AddIfIDMatch);
          this.ProjectData.ResourcePacks.animation_controllers.forEach(AddIfIDMatch);
          break;

        case ParameterType.block:
          this.ProjectData.BehaviorPacks.blocks.forEach(AddIfIDMatch);
          break;

        case ParameterType.entity:
          this.ProjectData.BehaviorPacks.entities.forEach(AddIfIDMatch);
          break;

        case ParameterType.event:
          this.ProjectData.BehaviorPacks.entities.forEach((entity) => {
            entity.events.forEach((event) => {
              if (event === id) out.push(entity);
            });
          });
          break;

        case ParameterType.event:
          this.ProjectData.BehaviorPacks.entities.forEach((entity) => {
            entity.families.forEach((family) => {
              if (family === id) out.push(entity);
            });
          });
          break;

        case ParameterType.function:
          this.ProjectData.BehaviorPacks.functions.forEach(AddIfIDMatch);
          break;

        case ParameterType.item:
          this.ProjectData.BehaviorPacks.items.forEach(AddIfIDMatch);
          break;

        case ParameterType.objective:
          this.ProjectData.General.objectives.forEach(AddIfIDMatch);
          break;

        case ParameterType.particle:
          this.ProjectData.ResourcePacks.particles.forEach(AddIfIDMatch);
          break;

        case ParameterType.sound:
          this.ProjectData.ResourcePacks.sounds.forEach(AddIfIDMatch);
          break;

        case ParameterType.structure:
          this.ProjectData.BehaviorPacks.structures.forEach(AddIfIDMatch);
          this.ProjectData.General.structures.forEach(AddIfIDMatch);
          break;

        case ParameterType.tag:
          this.ProjectData.General.tags.forEach(AddIfIDMatch);
          break;

        case ParameterType.tickingarea:
          this.ProjectData.General.tickingAreas.forEach(AddIfIDMatch);
          break;
      }
    }

    return out;
  }

  forEach(callbackfn: (item: BaseObject) => void): Promise<void> {
    const packs: forEachfn<BaseObject>[][] = [
      [this.ProjectData.general],
      this.ProjectData.behaviorPacks.packs,
      this.ProjectData.resourcePacks.packs,
      this.ProjectData.worlds.packs,
    ];

    return QueueProcessor.forEach<forEachfn<BaseObject>[]>(packs, (pack_col) => {
      return QueueProcessor.forEach<forEachfn<BaseObject>>(pack_col, (pack) => {
        return pack.forEach(callbackfn);
      }).then((items) => {});
    }).then((items) => {});
  }
}
