import { QueueProcessor } from "@daanv2/queue-processor";
import { ParameterType } from "bc-minecraft-bedrock-command";
import { Diagnoser } from "bc-minecraft-bedrock-diagnoser";
import { ProjectData } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
import { DiagnoserUtility as DiagnoserUtility } from "../Diagnostics/Diagnoser";
import { Console } from "../Manager/Console";
import { WorkspaceData } from "./WorkspaceData";

/** */
export class Database {
  /** */
  static Diagnoser: Diagnoser = DiagnoserUtility.createDiagnoser(() => Database.ProjectData);

  /** */
  static ProjectData: ProjectData = new ProjectData(Database.Diagnoser.context);

  /** */
  static WorkspaceData: WorkspaceData = new WorkspaceData();

  /**
   *
   */
  static Clear(): void {
    Console.Info("Resetting database");

    Database.Diagnoser = DiagnoserUtility.createDiagnoser(() => Database.ProjectData);
    Database.WorkspaceData = new WorkspaceData();
    Database.ProjectData = new ProjectData(Database.Diagnoser.context);
  }
}

type BaseObject = Types.BaseObject;

/**
 *
 */
export namespace Database {
  /**
   *
   * @param id
   * @param callbackfn
   */
  export function FindReference(id: string): BaseObject | undefined {
    return Database.ProjectData.find((item) => item.id === id);
  }

  /**
   *
   * @param id
   * @param callbackfn
   */
  export function FindReferences(id: string, Types: ParameterType[] | undefined = undefined): BaseObject[] {
    if (Types) return internalTypeSearch(id, Types);

    return internalSearchAll(id);
  }

  function internalSearchAll(id: string): BaseObject[] {
    return [];
  }

  function internalTypeSearch(id: string, Types: ParameterType[]): BaseObject[] {
    const out: BaseObject[] = [];
    const AddIfIDMatch = (item: BaseObject) => {
      if (item.id === id) out.push(item);
    };

    for (let I = 0; I < Types.length; I++) {
      const T = Types[I];

      switch (T) {
        case ParameterType.animation:
          Database.ProjectData.ResourcePacks.entities.forEach((entity) => {
            entity.animations.defined.forEach((anim) => {
              if (anim === id) out.push(entity);
            });
          });
          break;

        case ParameterType.block:
          Database.ProjectData.BehaviorPacks.blocks.forEach(AddIfIDMatch);
          break;

        case ParameterType.entity:
          Database.ProjectData.BehaviorPacks.entities.forEach(AddIfIDMatch);
          break;

        case ParameterType.event:
          Database.ProjectData.BehaviorPacks.entities.forEach((entity) => {
            entity.events.forEach((event) => {
              if (event === id) out.push(entity);
            });
          });
          break;

        case ParameterType.event:
          Database.ProjectData.BehaviorPacks.entities.forEach((entity) => {
            entity.families.forEach((family) => {
              if (family === id) out.push(entity);
            });
          });
          break;

        case ParameterType.function:
          Database.ProjectData.BehaviorPacks.functions.forEach(AddIfIDMatch);
          break;

        case ParameterType.item:
          Database.ProjectData.BehaviorPacks.items.forEach(AddIfIDMatch);
          break;

        case ParameterType.objective:
          Database.ProjectData.General.objectives.forEach(AddIfIDMatch);
          break;

        case ParameterType.particle:
          Database.ProjectData.ResourcePacks.particles.forEach(AddIfIDMatch);
          break;

        case ParameterType.sound:
          Database.ProjectData.ResourcePacks.sounds.forEach(AddIfIDMatch);
          break;

        case ParameterType.structure:
          Database.ProjectData.BehaviorPacks.structures.forEach(AddIfIDMatch);
          Database.ProjectData.General.structures.forEach(AddIfIDMatch);
          break;

        case ParameterType.tag:
          Database.ProjectData.General.tags.forEach(AddIfIDMatch);
          break;

        case ParameterType.tickingarea:
          Database.ProjectData.General.tickingAreas.forEach(AddIfIDMatch);
          break;
      }
    }

    return out;
  }

  export function ForEach(callbackfn: (item: BaseObject) => void): Promise<void> {
    const packs: (forEachfn<BaseObject>[])[] = [
      [Database.ProjectData.General],
      Database.ProjectData.BehaviorPacks.packs,
      Database.ProjectData.ResourcePacks.packs,
      Database.ProjectData.Worlds.packs,
    ];

    return QueueProcessor.forEach<forEachfn<BaseObject>[]>(packs, (pack_col)=>{
      return QueueProcessor.forEach<forEachfn<BaseObject>>(pack_col, (pack)=>{
        return pack.forEach(callbackfn);
      }).then((items)=>{});
    }).then((items)=>{});
  }
}

export interface forEachfn<T> {
  forEach(callbackfn: (value: Types.BaseObject) => void): void
}
