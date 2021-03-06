import { SymbolInformation, SymbolKind } from "vscode-languageserver";
import { DataCollector } from "../Database/DataCollector";
import { Database } from "../Database/Database";
import { Kinds } from "../Types/General/Kinds";
import { Identifiable, Locatable, Queryable } from "../Types/Minecraft/Interfaces/include";

export function Convert(uri: string, receiver: SymbolInformation[], query: string): void {
  if (query === "") {
    if (uri === "") {
      ConvertAll(receiver);
    } else {
      ConvertAllFile(uri, receiver);
    }
  } else {
    ConvertQueried(uri, receiver, query);
  }
}

export function ConvertAll(receiver: SymbolInformation[]): void {
  const uri = "";
  ConvertStorage(Database.Data.General.Blocks, uri, Kinds.Symbol.Block, receiver);
  ConvertStorage(Database.Data.General.Effects, uri, Kinds.Symbol.Effect, receiver);
  ConvertStorage(Database.Data.General.Entities, uri, Kinds.Symbol.Entity, receiver);
  ConvertStorage(Database.Data.General.FakeEntities, uri, Kinds.Symbol.Selector, receiver);
  ConvertStorage(Database.Data.General.Functions, uri, Kinds.Symbol.Functions, receiver);
  ConvertStorage(Database.Data.General.Items, uri, Kinds.Symbol.Item, receiver);
  ConvertStorage(Database.Data.General.Objectives, uri, Kinds.Symbol.Objectives, receiver);
  ConvertStorage(Database.Data.General.Sounds, uri, Kinds.Symbol.Sound, receiver);
  ConvertStorage(Database.Data.General.Tag, uri, Kinds.Symbol.Tag, receiver);
  ConvertStorage(Database.Data.General.TickingAreas, uri, Kinds.Symbol.Tickingarea, receiver);
}

export function ConvertAllFile(uri: string, receiver: SymbolInformation[]): void {
  ConvertStorage(Database.Data.General.Blocks, uri, Kinds.Symbol.Block, receiver);
  ConvertStorage(Database.Data.General.Effects, uri, Kinds.Symbol.Effect, receiver);
  ConvertStorage(Database.Data.General.Entities, uri, Kinds.Symbol.Entity, receiver);
  ConvertStorage(Database.Data.General.FakeEntities, uri, Kinds.Symbol.Selector, receiver);
  ConvertStorage(Database.Data.General.Functions, uri, Kinds.Symbol.Functions, receiver);
  ConvertStorage(Database.Data.General.Items, uri, Kinds.Symbol.Item, receiver);
  ConvertStorage(Database.Data.General.Objectives, uri, Kinds.Symbol.Objectives, receiver);
  ConvertStorage(Database.Data.General.Sounds, uri, Kinds.Symbol.Sound, receiver);
  ConvertStorage(Database.Data.General.Tag, uri, Kinds.Symbol.Tag, receiver);
  ConvertStorage(Database.Data.General.TickingAreas, uri, Kinds.Symbol.Tickingarea, receiver);
}

export function ConvertQueried(uri: string, receiver: SymbolInformation[], query: string) {
  ConvertStorageQuery(Database.Data.General.Blocks, uri, query, Kinds.Symbol.Block, receiver);
  ConvertStorageQuery(Database.Data.General.Effects, uri, query, Kinds.Symbol.Effect, receiver);
  ConvertStorageQuery(Database.Data.General.Entities, uri, query, Kinds.Symbol.Entity, receiver);
  ConvertStorageQuery(Database.Data.General.FakeEntities, uri, query, Kinds.Symbol.Selector, receiver);
  ConvertStorageQuery(Database.Data.General.Functions, uri, query, Kinds.Symbol.Functions, receiver);
  ConvertStorageQuery(Database.Data.General.Items, uri, query, Kinds.Symbol.Item, receiver);
  ConvertStorageQuery(Database.Data.General.Objectives, uri, query, Kinds.Symbol.Objectives, receiver);
  ConvertStorageQuery(Database.Data.General.Sounds, uri, query, Kinds.Symbol.Sound, receiver);
  ConvertStorageQuery(Database.Data.General.Tag, uri, query, Kinds.Symbol.Tag, receiver);
  ConvertStorageQuery(Database.Data.General.TickingAreas, uri, query, Kinds.Symbol.Tickingarea, receiver);
}

export function ConvertStorageQuery<T extends Identifiable & Locatable>(
  Data: DataCollector<T>,
  uri: string,
  query: string,
  valuekind: SymbolKind,
  receiver: SymbolInformation[]
): void {
  if (uri === "") {
    Data.ForEach((element) => CheckOrAdd(element, query, valuekind, receiver));
  } else {
    let Items = Data.GetFromFile(uri);

    if (Items) {
      Items.forEach((value) => CheckOrAdd(value, query, valuekind, receiver));
    }
  }
}

function CheckOrAdd(value: Identifiable & Locatable, query: string, valuekind: SymbolKind, receiver: SymbolInformation[]): void {
  if (Queryable.is(value)) {
    if (value.MatchQuery(query)) ConvertItem(value, valuekind, receiver);
  } else {
    if (value.Identifier.includes(query)) {
      ConvertItem(value, valuekind, receiver);
    }
  }
}

export function ConvertStorage<T extends Identifiable & Locatable>(Data: DataCollector<T>, uri: string, valuekind: SymbolKind, receiver: SymbolInformation[]): void {
  if (uri === "") {
    Data.ForEach((value) => ConvertItem(value, valuekind, receiver));
  } else {
    let Items = Data.GetFromFile(uri);

    if (Items) {
      for (let index = 0; index < Items.length; index++) {
        const element = Items[index];
        ConvertItem(element, valuekind, receiver);
      }
    }
  }
}

export function ConvertItem<T extends Identifiable & Locatable>(value: T, valuekind: SymbolKind, receiver: SymbolInformation[]): void {
  receiver.push(SymbolInformation.create(value.Identifier, valuekind, value.Location.range, value.Location.uri));
}
