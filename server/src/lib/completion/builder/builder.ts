import { Documentated, Identifiable } from "bc-minecraft-bedrock-types/lib/src/types";
import { CancellationToken, WorkDoneProgressReporter } from "vscode-languageserver";
import { CompletionItem, CompletionItemKind } from "vscode-languageserver-types";


export type GenerateFunction<T> = (item: T) => string;

export interface CompletionBuilder {
  /**
   * Adds a new completion item
   * @param item The item to add, will be sanitized
   * @returns The added and sanitized item
   */
  add(item: CompletionItem): CompletionItem;

  /**
   * Generate a completion item from the dataset / collection
   * @param dataset The dataset to generate from
   * @param generatefn The function to generate the documentation
   * @param kind The kind of completion item
   * @param query The query to filter the dataset
   */
  generate<T extends Identifiable | string>(dataset: IForEach<T> | undefined, generatefn: GenerateFunction<T>): CompletionItem[];
  generate<T extends Identifiable | string>(dataset: IForEach<T> | undefined, generatefn: GenerateFunction<T>, kind: CompletionItemKind): CompletionItem[];
  generate<T extends Identifiable | string>(dataset: IForEach<T> | undefined, generatefn: GenerateFunction<T>, kind: CompletionItemKind | undefined, query: string | undefined): CompletionItem[];

  /**
   * Generates a completion item from the item
   * @param callbackFn The function to call when a new item is generated
   */
  onNewItem(callbackFn: (item: CompletionItem, next: (item: CompletionItem) => void) => void): () => void;
}

/**
 *
 */
export class RootCompletionBuilder implements CompletionBuilder {
  public items: CompletionItem[];
  private _OnNewItem: ((item: CompletionItem) => void) | undefined;

  constructor(public token: CancellationToken, public workDoneProgress: WorkDoneProgressReporter) {
    this.items = [];
    this._OnNewItem = undefined;
  }

  /** @override */
  add(item: CompletionItem): CompletionItem {
    if (item.documentation) {
      if (typeof item.documentation === "string") {
        item.documentation = { kind: "markdown", value: item.documentation };
      }
    }

    if (item.kind === undefined) {
      item.kind = CompletionItemKind.Keyword;
    }

    this.items.push(item);
    return item;
  }

  generateItem<T extends Identifiable & Documentated>(
    item: T,
    generatefn: (item: T) => string,
    kind: CompletionItemKind = CompletionItemKind.Keyword
  ): CompletionItem {
    return this.add({
      label: item.id,
      documentation: item.documentation ?? generatefn(item),
      kind: kind,
    });
  }

  /** @override */
  generate<T extends Identifiable>(
    dataset: IForEach<T | string> | undefined,
    generatefn: (item: T) => string,
    kind: CompletionItemKind = CompletionItemKind.Keyword,
    query: string | undefined = undefined
  ): CompletionItem[] {
    const out: CompletionItem[] = [];
    if (dataset === undefined) return out;

    const filterFn = this.createFilter(query);
    dataset.forEach((item) => {
      if (this.token.isCancellationRequested) return;
      if (filterFn(item) === false) return;

      switch (typeof item) {
        case "string":
          out.push(this.add({ label: item, documentation: item, kind: kind }));
          break;
        default:
          out.push(this.generateItem(item, generatefn, kind));
      }
    });

    return out;
  }

  private createFilter(query: string | undefined): (item: Identifiable | string) => boolean {
    if (query === undefined) return () => true;

    return (item: Identifiable | string) => {
      if (typeof item === "string") return item.includes(query);
      return item.id.includes(query);
    };
  }

  onNewItem(callbackFn: (item: CompletionItem, next: (item: CompletionItem) => void) => void): () => void {
    const old = this._OnNewItem;
    const cancelFn = () => {
      this._OnNewItem = old;
    };

    this._OnNewItem = (item: CompletionItem) => {
      callbackFn(item, (item: CompletionItem) => {
        if (old) old(item);
      });
    };

    return cancelFn.bind(this);
  }
}

interface IForEach<T> {
  forEach(callbackfn: (value: T) => void, thisArg?: any): void;
}
