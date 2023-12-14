import { BehaviorPack } from "bc-minecraft-bedrock-project";
import { CompletionItemKind } from "vscode-languageserver-types";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { Types } from "bc-minecraft-bedrock-vanilla-data";

import { CommandCompletionContext } from "../../../Completion/Context";
import { Database } from "../../../Database/Database";
import { GetPossibleBlockID } from "../../Commands/Command/Functions";
import { IsEditingValue } from "../../General/Selector/AttributeValue/Completion";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../General/Kinds";
import { Location } from 'bc-minecraft-bedrock-types/lib/src/Types';
import { MolangSet } from 'bc-minecraft-molang/lib/src/Molang';

export function provideCompletion(context: CommandCompletionContext): void {
  const block = GetPossibleBlockID(context.command, context.parameterIndex);
  const edu = IsEducationEnabled(context.doc);

  if (!(context.current?.text.startsWith("[") ?? false)) {
    if (block) {
      let b: BehaviorPack.Block.Block | Types.BehaviorPack.Block | undefined;

      if ((b = Database.ProjectData.BehaviorPacks.blocks.get(block))) provideDefaultCompletion(b, context);
      if ((b = vanillaBlockToBlock(MinecraftData.BehaviorPack.getBlock(block, edu)))) provideDefaultCompletion(b, context);
    }

    context.receiver.Add("[]", "Block states", CompletionItemKind.Snippet);
    return;
  }

  if (block) {
    provideBlockCompletion(Database.ProjectData.BehaviorPacks.blocks.get(block), context);
    return provideBlockCompletion(vanillaBlockToBlock(MinecraftData.BehaviorPack.getBlock(block, edu)), context);
  }

  //return all
  Database.ProjectData.BehaviorPacks.blocks.forEach((block) => provideStateCompletion(block.states, context));

  provideStateCompletion(MinecraftData.General.Blocks.block_states, context);
}

function provideDefaultCompletion(
  b: BehaviorPack.Block.Block,
  context: CommandCompletionContext
): void {
  const pars = b.states.map((state) => `"${state.name}":${stateValue(state, state.values[0])}`);

  context.receiver.Add(`[${pars.join(",")}]`, `Default blockstates for: ${b.id}`, Kinds.Completion.Block);
}

function provideBlockCompletion(
  b: BehaviorPack.Block.Block | undefined,
  context: CommandCompletionContext
): void {
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
    context.receiver.GenerateStr(items, (item) => `block state ${item}`, CompletionItemKind.Property);
  }
}

function vanillaBlockToBlock(block: Types.BehaviorPack.Block | undefined): BehaviorPack.Block.Block | undefined {
  if (!block) return undefined;
  const states: BehaviorPack.Block.BlockState[] = [];

  for (let prop of block.properties) {
    const state = MinecraftData.BehaviorPack.getBlockState(prop);
    if (state) {
      states.push(state);
    };
  }

  return {
    id: block.id,
    location: Location.empty(),
    molang: MolangSet.create(),
    states: states,
  }
}

function stateValue(state: BehaviorPack.Block.BlockState, value: string | number | boolean) {
  if (state.type === "string") return `"${value}"`;

  return value;
}
