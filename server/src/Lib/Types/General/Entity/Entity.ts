import { ObjectBase } from "../Object Base/ObjectBase";

export class Entity extends ObjectBase {
  public ComponentGroups: string[];
  public Families: string[];
  public Events: string[];

  constructor() {
    super();

    this.ComponentGroups = [];
    this.Events = [];
    this.Families = [];
  }
}
