import { Identifiable } from "../../Types/Minecraft/Interfaces/Identifiable";
import { Locatable } from "../../Types/Minecraft/Interfaces/Locatable";
import { Behaviorpack } from "./Behaviorpack";
import { CollectorBase } from "./CollectorBase";
import { GeneralData } from "./GeneralData";
import { Resourcepack } from "./Resourcepack";

export class CollectedData extends CollectorBase<Identifiable & Locatable> {
  public Behaviorpack: Behaviorpack = new Behaviorpack();

  public Resourcepack: Resourcepack = new Resourcepack();

  public General: GeneralData = new GeneralData();
}
