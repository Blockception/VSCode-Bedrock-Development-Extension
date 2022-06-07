import { Types } from "bc-minecraft-bedrock-types";
import { Position } from "bc-minecraft-bedrock-types/lib/src/Types/Position";
import { Range, SymbolInformation, SymbolKind } from "vscode-languageserver";

type forEachCarrier<T> = { forEach: (callbackfn: (value: T) => void, thisArg?: any) => void };

export class SymbolBuilder {
  public query: string | undefined;
  public items: SymbolInformation[];
  public kind: SymbolKind;
  public containerName: string | undefined;
  private range: Range;

  constructor(query: string | undefined = undefined) {
    if (query === "") query = undefined;

    this.query = query;
    this.items = [];
    this.kind = SymbolKind.Object;
    this.range = Range.create(0, 0, 0, 0);
    this.containerName = undefined;
  }

  push(item: SymbolInformation): number {
    return this.items.push(item);
  }

  new(name: string, kind?: SymbolKind, range?: Range, uri?: string, containerName?: string): SymbolInformation {
    const item = SymbolInformation.create(name, kind ?? this.kind, range ?? this.range, uri ?? "", containerName ?? this.containerName);

    this.items.push(item);
    return item;
  }

  add(item: Types.BaseObject): SymbolInformation | undefined {
    if (this.query) {
      if (!item.id.includes(this.query)) return undefined;
    }

    let range: Range = this.range;
    const p = item.location.position;
    if (Position.is(p)) {
      range = Range.create(p, { character: p.character + item.id.length, line: p.line });
    }

    return this.new(item.id, this.kind, range, item.location.uri, this.containerName);
  }

  generate<T extends Types.BaseObject>(data: forEachCarrier<T>, kind: SymbolKind): void {
    this.kind = kind;

    data.forEach(this.add, this);
  }
}
