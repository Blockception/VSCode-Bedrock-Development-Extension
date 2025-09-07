import { MolangData } from "bc-minecraft-molang";
import { Context } from "../../../context/context";
import { CompletionContext } from "../../context";
import { generateMolangFunction } from "./general";

export function provideCompletion(context: Context<CompletionContext>): void {
  MolangData.General.Queries.forEach((item) => generateMolangFunction("query", item, context.builder));
}
