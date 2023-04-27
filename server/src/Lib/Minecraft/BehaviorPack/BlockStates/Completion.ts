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

export function ProvideCompletion(context: CommandCompletionContext): void {
  const block = GetPossibleBlockID(context.command, context.parameterIndex);
  const edu = IsEducationEnabled(context.doc);

  if (!(context.current?.text.startsWith("[") ?? false)) {
    if (block) {
      let b: BehaviorPack.Block.Block | Types.BehaviorPack.Block | undefined;

      if ((b = Database.ProjectData.BehaviorPacks.blocks.get(block))) ProvideDefaultCompletion(b, context);
      if ((b = MinecraftData.BehaviorPack.getBlock(block, edu))) ProvideDefaultCompletion(b, context);
    }

    context.receiver.Add("[]", "Block states", CompletionItemKind.Snippet);
    return;
  }

  if (block) {
    ProvideBlockCompletion(Database.ProjectData.BehaviorPacks.blocks.get(block), context);
    return ProvideBlockCompletion(MinecraftData.BehaviorPack.getBlock(block, edu), context);
  }

  //return all
  Database.ProjectData.BehaviorPacks.blocks.forEach((block) => ProvideStateCompletion(block.states, context));

  ProvideStateCompletion(MinecraftData.General.Blocks.blockstates, context);
}

function ProvideDefaultCompletion(
  b: BehaviorPack.Block.Block | Types.BehaviorPack.Block,
  context: CommandCompletionContext
): void {
  const pars = b.states.map((state) => `"${state.name}":${stateValue(state, state.values[0])}`);

  context.receiver.Add(`[${pars.join(",")}]`, `Default blockstates for: ${b.id}`, Kinds.Completion.Block);
}

function ProvideBlockCompletion(
  b: BehaviorPack.Block.Block | Types.BehaviorPack.Block | undefined,
  context: CommandCompletionContext
): void {
  if (!b) return;
  ProvideStateCompletion(b.states, context);
}

function ProvideStateCompletion(states: BehaviorPack.Block.BlockState[], context: CommandCompletionContext): void {
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

function stateValue(state: BehaviorPack.Block.BlockState, value: string) {
  if (state.type === "string") return `"${value}"`;

  return value;
}
