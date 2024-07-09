import { CompletionBuilder } from "../../builder/builder";
import { CompletionItem, CompletionItemKind } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { SimpleContext } from "../../../Code/SimpleContext";
import { BehaviorPack, ResourcePack } from "bc-minecraft-bedrock-project";

export function provideCompletion(context: SimpleContext<CompletionBuilder>, pos: Position): void {
  const receiver = context.receiver;
  const cursor = pos.character;

  //key or comment
  receiver.add("###", "comment", CompletionItemKind.Snippet);
  receiver.add("###region", "Region", CompletionItemKind.Snippet, "###region example\n\n###endregion");

  const line = context.doc.getLine(pos.line);

  //in comment
  if (isIn("#", cursor, line)) {
    return;
  }

  if (isIn("=", cursor, line)) {
    receiver.add("Black §0", "The colour: Black", CompletionItemKind.Color, "§0");
    receiver.add("Dark Blue §1", "The colour: Dark blue", CompletionItemKind.Color, "§1");
    receiver.add("Dark Green §2", "The colour: Dark green", CompletionItemKind.Color, "§2");
    receiver.add("Dark Aqua §3", "The colour: Dark aqua", CompletionItemKind.Color, "§3");
    receiver.add("Dark Red §4", "The colour: Dark red", CompletionItemKind.Color, "§4");
    receiver.add("Dark Purple §5", "The colour: Dark purple", CompletionItemKind.Color, "§5");
    receiver.add("Gold §6", "The colour: Gold", CompletionItemKind.Color, "§6");
    receiver.add("Gray §7", "The colour: Gray", CompletionItemKind.Color, "§7");
    receiver.add("Dark Gray §8", "The colour: Dark gray", CompletionItemKind.Color, "§8");
    receiver.add("Blue §9", "The colour: Blue", CompletionItemKind.Color, "§9");
    receiver.add("Green §a", "The colour: Green", CompletionItemKind.Color, "§a");
    receiver.add("Aqua §b", "The colour: Aqua", CompletionItemKind.Color, "§b");
    receiver.add("Red §c", "The colour: Red", CompletionItemKind.Color, "§c");
    receiver.add("Light Purple §d", "The colour: Light purple", CompletionItemKind.Color, "§d");
    receiver.add("Yellow §e", "The colour: Yellow", CompletionItemKind.Color, "§e");
    receiver.add("White §f", "The colour: White", CompletionItemKind.Color, "§f");
    receiver.add("Minecoin Gold §g", "The colour: Minecoin Gold", CompletionItemKind.Color, "§g");
    receiver.add("Material Quartz §", "The colour: Material Quartz", CompletionItemKind.Color, "§h");
    receiver.add("Material Iron §", "The colour: Material Iron", CompletionItemKind.Color, "§i");
    receiver.add("Material Netherite §", "The colour: Material Netherite", CompletionItemKind.Color, "§j");
    receiver.add("Material Redstone §", "The colour: Material Redstone", CompletionItemKind.Color, "§m");
    receiver.add("Material Copper §", "The colour: Material Copper", CompletionItemKind.Color, "§n");
    receiver.add("Material Gold §", "The colour: Material Gold", CompletionItemKind.Color, "§p");
    receiver.add("Material Emerald §", "The colour: Material Emerald", CompletionItemKind.Color, "§q");
    receiver.add("Material Diamond §", "The colour: Material Diamond", CompletionItemKind.Color, "§s");
    receiver.add("Material Lapis §", "The colour: Material Lapis", CompletionItemKind.Color, "§t");
    receiver.add("Material Amethyst §", "The colour: Material Amethyst", CompletionItemKind.Color, "§u");

    receiver.add("Random Symbols §k", "Makes the text from this point random symbols", CompletionItemKind.Color, "§k");
    receiver.add("Bold §l", "Makes the text from this point bold", CompletionItemKind.Color, "§l");
    receiver.add("Italic §o", "Makes the text from this point italic", CompletionItemKind.Color, "§o");
    receiver.add("Reset §r", "Resets the current formatting of text", CompletionItemKind.Color, "§r");

    return;
  }

  if (cursor > 3) {
    receiver.add("=", "Start of the value", CompletionItemKind.Snippet);
  }

  const pack = context.doc.getPack();
  if (!pack) return;

  const check_receiver = {
    Add(id: string, doc: string, kind: CompletionItemKind, insertText?: string): CompletionItem {
      if (context.doc.getText().includes(insertText ?? id)) {
        return {} as any;
      }

      return receiver.add(id, doc, kind, insertText);
    },
  };

  if (BehaviorPack.BehaviorPack.is(pack)) {
    generate_bp(pack, check_receiver);
  } else if (ResourcePack.ResourcePack.is(pack)) {
    generate_rp(pack, check_receiver);
  }
}

export function generate_bp(pack: BehaviorPack.BehaviorPack, receiver: Pick<CompletionBuilder, "Add">) {
  pack.entities.forEach((entity) => {
    const docu = entity.documentation || `Entity: ${entity.id}`;
    receiver.add(`entity.${entity.id}.name`, docu, CompletionItemKind.Property, `entity.${entity.id}.name=`);
    receiver.add(
      `item.spawn_egg.entity.${entity.id}.name`,
      docu,
      CompletionItemKind.Property,
      `item.spawn_egg.entity.${entity.id}.name=`
    );
  });

  pack.blocks.forEach((block) =>
    receiver.add(
      `tile.${block.id}.name`,
      block.documentation || `Entity: ${block.id}`,
      CompletionItemKind.Property,
      `tile.${block.id}.name=`
    )
  );
  pack.items.forEach((item) =>
    receiver.add(
      `item.${item.id}.name`,
      item.documentation || `Entity: ${item.id}`,
      CompletionItemKind.Property,
      `item.${item.id}.name=`
    )
  );
}

export function generate_rp(pack: ResourcePack.ResourcePack, receiver: Pick<CompletionBuilder, "Add">) {
  pack.entities.forEach((entity) => {
    const id = safe_id(entity.id);

    receiver.add(
      `entity.${entity.id}.name`,
      entity.documentation || "Entity: " + entity.id,
      CompletionItemKind.Property
    );
    receiver.add(
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
