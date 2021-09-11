import { Documentated, Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/include";
import { CompletionItem, CompletionItemKind, MarkupContent } from "vscode-languageserver-types";
import { TextDocument } from "../Types/Document/TextDocument";

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
    if (Documentated.is(value)) {
      const doc = value.documentation;

      if (doc) this.Add(value.id, doc, valuekind);
    }

    this.Add(value.id, "The custom definition of: " + value.id, valuekind);
  }
}
