import { BehaviorPack } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-vanilla-data";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { CompletionItemKind } from "vscode-languageserver-types";

import { CommandCompletionContext } from "../../../Completion/Context";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { GetPossibleBlockID } from "../../Commands/Command/Functions";
import { Kinds } from "../../General/Kinds";
import { IsEditingValue } from '../../General/Selector/AttributeValue/Completion';

export function ProvideCompletion(context: CommandCompletionContext): void {
  const block = GetPossibleBlockID(context.command, context.parameterIndex);
  const edu = IsEducationEnabled(context.doc);

  if (!(context.current?.text.startsWith("[") ?? false)) {
    if (block) {
      let b: BehaviorPack.Block.Block | Types.BehaviorPack.Block | undefined;

      if ((b = Database.ProjectData.BehaviorPacks.blocks.get(block))) ProvideDefaultCompletion(b, context);
      if ((b = MinecraftData.BehaviorPack.getBlock(block, edu))) ProvideDefaultCompletion(b, context);

      return;
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

function ProvideDefaultCompletion(b: BehaviorPack.Block.Block | Types.BehaviorPack.Block, context: CommandCompletionContext): void {
  const pars: string[] = [];

  b.states.forEach((state) => pars.push(`${state.name}=${state.values[0]}`));

  context.receiver.Add(`[${pars.join(",")}]`, `Default blockstates for: ${b.id}`, Kinds.Completion.Block);
}

function ProvideBlockCompletion(b: BehaviorPack.Block.Block | Types.BehaviorPack.Block | undefined, context: CommandCompletionContext): void {
  if (!b) return;
  ProvideStateCompletion(b.states, context);
}

function ProvideStateCompletion(states: BehaviorPack.Block.BlockState[], context: CommandCompletionContext): void {
  const inValue = context.current ? IsEditingValue(context.current, context.cursor) : false;

  for (let I = 0; I < states.length; I++) {
    const s = states[I];

    if (inValue) {
      context.receiver.GenerateStr(s.values, (item) => `block state: ${s.name} with value: ${item}`, CompletionItemKind.Property);
    } else {
      context.receiver.Add(s.name, `block state: ${s.name} of ${s.type}`, CompletionItemKind.Property);
    }
  }
}
