import { Documentated, Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types";
import { CompletionItem, CompletionItemKind, MarkupContent } from "vscode-languageserver-types";

/**
 *
 */
export class CompletionBuilder {
  /**
   *
   */
  public items: CompletionItem[];

  /**
   *
   */
  public OnNewItem: ((NewItem: CompletionItem) => void) | undefined;

  /**
   *
   */
  constructor() {
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

  /**
   *
   * @param item
   * @param generatefn
   * @param kind
   * @returns
   */
  GenerateItem<T extends Identifiable>(item: T, generatefn: (item: T) => string, kind: CompletionItemKind = CompletionItemKind.Keyword): CompletionItem {
    const docet = <Documentated>item;
    let doc = docet.documentation;

    if (!doc) {
      doc = generatefn(item);
      docet.documentation = doc;
    }

    return this.Add(item.id, doc, kind);
  }

  /**
   *
   * @param dataset
   * @param generatefn
   * @param kind
   * @param query
   * @returns
   */
  Generate<T extends Identifiable>(
    dataset: IForEach<T>,
    generatefn: (item: T) => string,
    kind: CompletionItemKind = CompletionItemKind.Keyword,
    query: string | undefined = undefined
  ): CompletionItem[] {
    const out: CompletionItem[] = [];
    if (dataset === undefined) return out;

    if (query) {
      dataset.forEach((item) => {
        if (item.id.includes(query)) out.push(this.GenerateItem(item, generatefn, kind));
      });
    } else {
      dataset.forEach((item) => out.push(this.GenerateItem(item, generatefn, kind)));
    }

    return out;
  }

  /**
   *
   * @param dataset
   * @param generatefn
   * @param kind
   * @param query
   * @returns
   */
  GenerateStr(
    dataset: IForEach<string>,
    generatefn: (item: string) => string,
    kind: CompletionItemKind = CompletionItemKind.Keyword,
    query: string | undefined = undefined
  ): CompletionItem[] {
    const out: CompletionItem[] = [];
    if (dataset === undefined) return out;

    if (query) {
      dataset.forEach((item) => {
        if (item.includes(query)) out.push(this.Add(item, generatefn(item), kind));
      });
    } else {
      dataset.forEach((item) => out.push(this.Add(item, generatefn(item), kind)));
    }

    return out;
  }
}

interface IForEach<T> {
  forEach(callbackfn: (value: T) => void, thisArg?: any): void;
}
