import { BehaviorPack } from "bc-minecraft-bedrock-project";
import { CommandCompletionContext } from "../../builder/context";
import { CompletionItemKind } from "vscode-languageserver-types";
import { GetPossibleBlockID } from "../../../../minecraft/commands";
import { IsEditingValue } from "../selectors/attribute-values";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants/kinds";
import { Location } from "bc-minecraft-bedrock-types/lib/src/types";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { MolangSet } from "bc-minecraft-molang/lib/src/Molang";
import { Types } from "bc-minecraft-bedrock-vanilla-data";


export function provideCompletion(context: CommandCompletionContext): void {
  const block = GetPossibleBlockID(context.command, context.parameterIndex);
  const edu = IsEducationEnabled(context.doc);

  if (!(context.current?.text.startsWith("[") ?? false)) {
    if (block) {
      let b: BehaviorPack.Block.Block | Types.BehaviorPack.Block | undefined;

      if ((b = context.projectData.BehaviorPacks.blocks.get(block))) provideDefaultCompletion(b, context);
      if ((b = vanillaBlockToBlock(MinecraftData.BehaviorPack.getBlock(block, edu))))
        provideDefaultCompletion(b, context);
    }

    context.builder.add({ label: "[]", documentation: "Block states", kind: CompletionItemKind.Snippet });
    return;
  }

  if (block) {
    provideBlockCompletion(context.projectData.BehaviorPacks.blocks.get(block), context);
    return provideBlockCompletion(vanillaBlockToBlock(MinecraftData.BehaviorPack.getBlock(block, edu)), context);
  }

  //return all
  context.projectData.BehaviorPacks.blocks.forEach((block) => provideStateCompletion(block.states, context));

  provideStateCompletion(MinecraftData.General.Blocks.block_states, context);
}

function provideDefaultCompletion(b: BehaviorPack.Block.Block, context: CommandCompletionContext): void {
  const pars = b.states.map((state) => `"${state.name}":${stateValue(state, state.values[0])}`);

  context.builder.add({
    label: `[${pars.join(",")}]`,
    documentation: `Default blockstates for: ${b.id}`,
    kind: Kinds.Completion.Block,
  });
}

function provideBlockCompletion(b: BehaviorPack.Block.Block | undefined, context: CommandCompletionContext): void {
  if (!b) return;
  provideStateCompletion(b.states, context);
}

function provideStateCompletion(states: BehaviorPack.Block.BlockState[], context: CommandCompletionContext): void {
  const inValue = context.current ? IsEditingValue(context.current, context.cursor) : false;

  if (inValue) {
    return;
  }

  // Output all state
  for (let state of states) {
    const name = `"${state.name}"`;
    const values = state.values.map((value) => stateValue(state, value));

    const items = values.map((value) => `${name}:${value}`);
    context.builder.generate(items, (item) => `block state ${item}`, CompletionItemKind.Property);
  }
}

function vanillaBlockToBlock(block: Types.BehaviorPack.Block | undefined): BehaviorPack.Block.Block | undefined {
  if (!block) return undefined;
  const states: BehaviorPack.Block.BlockState[] = [];

  for (let prop of block.properties) {
    const state = MinecraftData.BehaviorPack.getBlockState(prop);
    if (state) {
      states.push(state);
    }
  }

  return {
    id: block.id,
    location: Location.empty(),
    molang: MolangSet.create(),
    states: states,
  };
}

function stateValue(state: BehaviorPack.Block.BlockState, value: string | number | boolean) {
  if (state.type === "string") return `"${value}"`;

  return value;
}
