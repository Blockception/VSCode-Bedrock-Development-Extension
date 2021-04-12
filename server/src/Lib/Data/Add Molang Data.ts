import { MolangData } from "../Molang/MolangData";
import * as data from "./molang.json";

export function AddMolangData(collector: MolangData) {
  collector.Math = data.math;
  collector.Query = data.query;

  collector.Entities.variable = data.entities.variable;
  collector.Particles.variable = data.particles.variable;
}
