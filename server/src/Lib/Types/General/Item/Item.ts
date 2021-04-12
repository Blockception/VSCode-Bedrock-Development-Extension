import { ObjectBase } from "../Object Base/ObjectBase";

export class Item extends ObjectBase {
  public Events: string[];

  constructor() {
    super();

    this.Events = [];
  }
}
