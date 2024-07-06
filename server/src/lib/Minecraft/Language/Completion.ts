import { CompletionBuilder } from "../../Completion/Builder";
import { CompletionItemKind } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { SimpleContext } from "../../Code/SimpleContext";
import { BehaviorPack, ResourcePack } from "bc-minecraft-bedrock-project";

export function provideCompletion(context: SimpleContext<CompletionBuilder>, pos: Position): void {
  const receiver = context.receiver;
  const cursor = pos.character;

  if (cursor <= 0) {
    //key or comment
    receiver.Add("###", "comment", CompletionItemKind.Snippet);
    receiver.Add("###region", "Region", CompletionItemKind.Snippet, "###region example\n\n###endregion");

    return;
  }

  const line = context.doc.getLine(pos.line);

  //in comment
  if (isIn("#", cursor, line)) {
    return;
  }

  if (isIn("=", cursor, line)) {
    receiver.Add("Black §0", "The colour: Black", CompletionItemKind.Color, "§0");
    receiver.Add("Dark Blue §1", "The colour: Dark blue", CompletionItemKind.Color, "§1");
    receiver.Add("Dark Green §2", "The colour: Dark green", CompletionItemKind.Color, "§2");
    receiver.Add("Dark Aqua §3", "The colour: Dark aqua", CompletionItemKind.Color, "§3");
    receiver.Add("Dark Red §4", "The colour: Dark red", CompletionItemKind.Color, "§4");
    receiver.Add("Dark Purple §5", "The colour: Dark purple", CompletionItemKind.Color, "§5");
    receiver.Add("Gold §6", "The colour: Gold", CompletionItemKind.Color, "§6");
    receiver.Add("Gray §7", "The colour: Gray", CompletionItemKind.Color, "§7");
    receiver.Add("Dark Gray §8", "The colour: Dark gray", CompletionItemKind.Color, "§8");
    receiver.Add("Blue §9", "The colour: Blue", CompletionItemKind.Color, "§9");
    receiver.Add("Green §a", "The colour: Green", CompletionItemKind.Color, "§a");
    receiver.Add("Aqua §b", "The colour: Aqua", CompletionItemKind.Color, "§b");
    receiver.Add("Red §c", "The colour: Red", CompletionItemKind.Color, "§c");
    receiver.Add("Light Purple §d", "The colour: Light purple", CompletionItemKind.Color, "§d");
    receiver.Add("Yellow §e", "The colour: Yellow", CompletionItemKind.Color, "§e");
    receiver.Add("White §f", "The colour: White", CompletionItemKind.Color, "§f");
    receiver.Add("Minecoin Gold §g", "The colour: Minecoin Gold", CompletionItemKind.Color, "§g");
    receiver.Add("Material Quartz §", "The colour: Material Quartz", CompletionItemKind.Color, "§h");
    receiver.Add("Material Iron §", "The colour: Material Iron", CompletionItemKind.Color, "§i");
    receiver.Add("Material Netherite §", "The colour: Material Netherite", CompletionItemKind.Color, "§j");
    receiver.Add("Material Redstone §", "The colour: Material Redstone", CompletionItemKind.Color, "§m");
    receiver.Add("Material Copper §", "The colour: Material Copper", CompletionItemKind.Color, "§n");
    receiver.Add("Material Gold §", "The colour: Material Gold", CompletionItemKind.Color, "§p");
    receiver.Add("Material Emerald §", "The colour: Material Emerald", CompletionItemKind.Color, "§q");
    receiver.Add("Material Diamond §", "The colour: Material Diamond", CompletionItemKind.Color, "§s");
    receiver.Add("Material Lapis §", "The colour: Material Lapis", CompletionItemKind.Color, "§t");
    receiver.Add("Material Amethyst §", "The colour: Material Amethyst", CompletionItemKind.Color, "§u");

    receiver.Add("Random Symbols §k", "Makes the text from this point random symbols", CompletionItemKind.Color, "§k");
    receiver.Add("Bold §l", "Makes the text from this point bold", CompletionItemKind.Color, "§l");
    receiver.Add("Italic §o", "Makes the text from this point italic", CompletionItemKind.Color, "§o");
    receiver.Add("Reset §r", "Resets the current formatting of text", CompletionItemKind.Color, "§r");

    return;
  }

  receiver.Add("=", "Start of the value", CompletionItemKind.Snippet);

  const pack = context.doc.getPack();
  if (!pack) return;

  if (BehaviorPack.BehaviorPack.is(pack)) {
    generate_bp(pack, receiver);
  } else if (ResourcePack.ResourcePack.is(pack)) {
    generate_rp(pack, receiver);
  }
}

export function generate_bp(pack: BehaviorPack.BehaviorPack, receiver: CompletionBuilder) {
  pack.entities.forEach((entity) => {
    const docu = entity.documentation || `Entity: ${entity.id}`;
    receiver.Add(`entity.${entity.id}.name`, docu, CompletionItemKind.Property);
    receiver.Add(`item.spawn_egg.entity.${entity.id}.name`, docu, CompletionItemKind.Property);
  });

  pack.blocks.forEach((block) =>
    receiver.Add(
      `tile.${block.id}.name`,
      block.documentation || `Entity: ${block.id}`,
      CompletionItemKind.Property
    )
  );
  pack.items.forEach((item) =>
    receiver.Add(`item.${item.id}.name`, item.documentation || `Entity: ${item.id}`, CompletionItemKind.Property)
  );
}

export function generate_rp(pack: ResourcePack.ResourcePack, receiver: CompletionBuilder) {
  pack.entities.forEach((entity) => {
    const id = safe_id(entity.id);

    receiver.Add(
      `entity.${entity.id}.name`,
      entity.documentation || "Entity: " + entity.id,
      CompletionItemKind.Property
    );
    receiver.Add(
      `item.spawn_egg.entity.${entity.id}.name`,
      entity.documentation || "Entity: " + entity.id,
      CompletionItemKind.Property
    );
  });
}

function isIn(text: string, index: number, inText: string): boolean {
  let findIndex = inText.indexOf(text);

  if (findIndex < 0) return false;

  if (index > findIndex) return true;

  return false;
}

function safe_id(id: string): string {
  const index = id.indexOf(":");
  if (index > -1) {
    return id.substring(index + 1, id.length).trim();
  }

  return id;
}
