import { MolangData } from "bc-minecraft-molang";
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';
import { generateMolangFunction } from './general';

export function provideCompletion(context: Context<CompletionContext>): void {
  MolangData.General.Math.forEach((item) => generateMolangFunction("math", item, context.builder));
}
