import { Block } from "../../Types/General/Block/Block";
import { Effect } from "../../Types/General/Effect/Effect";
import { Entity } from "../../Types/General/Entity/Entity";
import { FakeEntity } from "../../Types/General/FakeEntity/include";
import { McFunction } from "../../Types/General/Functions/include";
import { Item } from "../../Types/General/Item/Item";
import { Objective } from "../../Types/General/Objectives/include";
import { Sound } from "../../Types/General/Sound/Sound";
import { Tag } from "../../Types/General/Tag/Tag";
import { Tickingarea } from "../../Types/General/Tickingarea/include";
import { Identifiable, Locatable } from "../../Types/Minecraft/Interfaces/include";
import { DataCollector } from "../DataCollector";
import { CollectorBase } from "./CollectorBase";

/**
 *
 */
export class GeneralData extends CollectorBase<Identifiable & Locatable> {
  /**A storage of all collected blocks*/
  public Blocks: DataCollector<Block> = new DataCollector<Block>();

  /** A storage of all collected entities*/
  public Entities: DataCollector<Entity> = new DataCollector<Entity>();

  /** A storage of all collected entities*/
  public Functions: DataCollector<McFunction> = new DataCollector<McFunction>();

  /** A storage of all collected effects*/
  public Effects: DataCollector<Effect> = new DataCollector<Effect>();

  /** A storage of all collected entities*/
  public FakeEntities: DataCollector<FakeEntity> = new DataCollector<FakeEntity>();

  /** A storage of all collected entities*/
  public Items: DataCollector<Item> = new DataCollector<Item>();

  /** A storage of all collected entities*/
  public Objectives: DataCollector<Objective> = new DataCollector<Objective>();

  /** A storage of all collected entities*/
  public Sounds: DataCollector<Sound> = new DataCollector<Sound>();

  /** A storage of all collected entities*/
  public Tag: DataCollector<Tag> = new DataCollector<Tag>();

  /** A storage of all collected entities*/
  public TickingAreas: DataCollector<Tickingarea> = new DataCollector<Tickingarea>();
}
