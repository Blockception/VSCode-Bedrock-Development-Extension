import { Behaviorpack } from "./Behaviorpack";
import { CollectorBase } from "./CollectorBase";
import { GeneralData } from "./GeneralData";
import { Resourcepack } from "./Resourcepack";

export class CollectedData extends CollectorBase {
  public Behaviourpack: Behaviorpack = new Behaviorpack();

  public Resourcepack: Resourcepack = new Resourcepack();

  public General: GeneralData = new GeneralData();
}
