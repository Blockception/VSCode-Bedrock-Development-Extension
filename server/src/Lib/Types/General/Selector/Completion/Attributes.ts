import { MarkupContent, CompletionItem, CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../../../Completion/Builder";

function AttributeCompletion(label: string, documentation: string | MarkupContent): CompletionItem {
  return { label: label, insertText: label + "=", kind: CompletionItemKind.Property, documentation: documentation };
}

//Doesnt do scores and doesnt need to
export function provideSelectorAttributeCompletion(receiver: CompletionBuilder, forEntities: boolean): void {
  receiver.items.push(
    AttributeCompletion("c", "limits the amount of entities/player to be targeted"),
    AttributeCompletion("dx", "The length of the box over the axis X"),
    AttributeCompletion("dy", "The length of the box over the axis Y"),
    AttributeCompletion("dz", "The length of the box over the axis Z"),
    AttributeCompletion("family", "Tests whether or not the target has a given family type. Can be either string or single word"),
    AttributeCompletion("l", "The maximum amount of XP the target has"),
    AttributeCompletion("lm", "The minimum amount of XP the target has"),
    AttributeCompletion("m", "The gamemode of the player"),
    AttributeCompletion("name", "Tests whether or not the target has a given name. Can be either string or single word"),
    AttributeCompletion("r", "The maximum distance to the target"),
    AttributeCompletion("rm", "The minimum distance to the target"),
    AttributeCompletion("rx", "The maximum vertical rotation"),
    AttributeCompletion("rxm", "The minimum vertical rotation"),
    AttributeCompletion("ry", "The maximum horizontal rotation"),
    AttributeCompletion("rym", "The minimum horizontal rotation"),
    { label: "scores", insertText: "scores" + "={", kind: CompletionItemKind.Property, documentation: "The testing of scores" },
    AttributeCompletion("tag", "Tests if the target has or does not have the specified tag"),
    AttributeCompletion("x", "The x coordinate this selector works from, can be relative, but not local"),
    AttributeCompletion("y", "The y coordinate this selector works from, can be relative, but not local"),
    AttributeCompletion("y", "The z coordinate this selector works from, can be relative, but not local")
  );

  if (forEntities) {
    receiver.items.push(AttributeCompletion("type", "Tests if the target has or does not have the specified type"));
  }
}
