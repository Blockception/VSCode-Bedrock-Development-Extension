import { CompletionItem, CompletionItemKind, MarkupContent } from "vscode-languageserver-types";
import { DataCollector } from "../Database/include";
import { TextDocument } from "../Types/Document/TextDocument";
import { Item } from "../Types/General/include";
import { Documentable, Identifiable, Locatable } from "../Types/Minecraft/Interfaces/include";

export class CompletionBuilder {
  public items: CompletionItem[];
  public OnNewItem: ((NewItem: CompletionItem) => void) | undefined;
  public doc: TextDocument;

  constructor(doc: TextDocument) {
    this.doc = doc;
    this.items = [];
    this.OnNewItem = undefined;
  }

  /**
   *
   * @param label
   * @param documentation
   * @param kind
   * @param insertText
   */
  Add(label: string, documentation: string | MarkupContent, kind: CompletionItemKind = CompletionItemKind.Keyword, insertText: string | undefined = undefined): CompletionItem {
    let item = CompletionItem.create(label);

    if (typeof documentation === "string") {
      item.documentation = { kind: "markdown", value: documentation };
    } else {
      item.documentation = documentation;
    }

    if (insertText) {
      item.insertText = insertText;
    }

    item.kind = kind;

    if (this.OnNewItem) {
      this.OnNewItem(item);
    }

    this.items.push(item);
    return item;
  }

  AddFrom(value: Identifiable, valuekind: CompletionItemKind): void {
    if (Documentable.is(value)) {
      this.Add(value.Identifier, value.Documentation, valuekind);
    } else {
      this.Add(value.Identifier, "The custom definition of: " + value.Identifier, valuekind);
    }
  }

  AddFromRange<T extends Identifiable & Locatable>(value: DataCollector<T>, valuekind: CompletionItemKind): void {
    value.ForEach((data) => {
      this.AddFrom(data, valuekind);
    });
  }
}
