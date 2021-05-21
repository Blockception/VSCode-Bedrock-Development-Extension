import { AddMolangData } from "../Data/Add Molang Data";

/**
 *
 */
export interface MolangFunctionDataItem {
  /**
   *
   */
  function: string;
  /**
   *
   */
  documentation: string;
}

/**
 *
 */
export interface MolangSpecificData {
  /**
   *
   */
  variable: MolangFunctionDataItem[];
}

/**
 *
 */
export class MolangData {
  /** */
  public Query: MolangFunctionDataItem[];
  /** */
  public Math: MolangFunctionDataItem[];
  /** */
  public Entities: MolangSpecificData;
  /** */
  public Particles: MolangSpecificData;

  constructor() {
    this.Math = [];
    this.Query = [];
    this.Entities = { variable: [] };
    this.Particles = { variable: [] };

    AddMolangData(this);
  }
}
