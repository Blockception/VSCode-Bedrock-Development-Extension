import { Block } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/BehaviorPack/include";
import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  Context.receiver.AddFromRange<Block.Block>(Database.ProjectData.BehaviorPacks.blocks, generateBlock, Kinds.Completion.Block);
}

function generateBlock(blocks: Block.Block): string | undefined {
  return `The block definition: ${blocks.id}`;
}
