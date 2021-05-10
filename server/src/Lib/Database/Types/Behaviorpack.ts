import { Identifiable } from "../../Types/Minecraft/Interfaces/Identifiable";
import { Locatable } from "../../Types/Minecraft/Interfaces/Locatable";
import { DataCollector } from "../DataCollector";
import { CollectorBase } from "./CollectorBase";
import { DataReference } from "./Reference";

export class Behaviorpack extends CollectorBase<Identifiable & Locatable> {
  public AnimationControllers: DataCollector<DataReference>;
  public Animations: DataCollector<DataReference>;
  public Blocks: DataCollector<DataReference>;
  public Entities: DataCollector<DataReference>;
  public Items: DataCollector<DataReference>;
  public LootTables: DataCollector<DataReference>;
  public Recipes: DataCollector<DataReference>;
  public SpawnRules: DataCollector<DataReference>;
  public Trading: DataCollector<DataReference>;

  constructor() {
    super();
    this.AnimationControllers = new DataCollector<DataReference>();
    this.Animations = new DataCollector<DataReference>();
    this.Blocks = new DataCollector<DataReference>();
    this.Entities = new DataCollector<DataReference>();
    this.Items = new DataCollector<DataReference>();
    this.LootTables = new DataCollector<DataReference>();
    this.Recipes = new DataCollector<DataReference>();
    this.SpawnRules = new DataCollector<DataReference>();
    this.Trading = new DataCollector<DataReference>();
  }
}
