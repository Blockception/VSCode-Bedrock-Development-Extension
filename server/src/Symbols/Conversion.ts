/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import { SymbolInformation, SymbolKind } from "vscode-languageserver";
import { Identifiable, Locatable } from '../minecraft/Interfaces/include';
import { DataCollector } from '../database/DataCollector';
import { Database } from '../database/Database';
import { Kinds } from '../minecraft/types/Kinds';
import { Queryable } from '../minecraft/Interfaces/Queryable';

export function Convert(uri: string, receiver: SymbolInformation[], query: string): void {
  if (query === '') {
    if (uri === '') {
      ConvertAll(receiver);
    }
    else {
      ConvertAllFile(uri, receiver);
    }
  }
  else {
    ConvertQueried(uri, receiver, query);
  }
}

export function ConvertAll(receiver: SymbolInformation[]): void {
  const uri = '';
  ConvertStorage(Database.Data.Blocks, uri, Kinds.Symbol.Block, receiver);
  ConvertStorage(Database.Data.Effects, uri, Kinds.Symbol.Effect, receiver);
  ConvertStorage(Database.Data.Entities, uri, Kinds.Symbol.Entity, receiver);
  ConvertStorage(Database.Data.FakeEntities, uri, Kinds.Symbol.Selector, receiver);
  ConvertStorage(Database.Data.Functions, uri, Kinds.Symbol.Functions, receiver);
  ConvertStorage(Database.Data.Items, uri, Kinds.Symbol.Item, receiver);
  ConvertStorage(Database.Data.Objectives, uri, Kinds.Symbol.Objectives, receiver);
  ConvertStorage(Database.Data.Sounds, uri, Kinds.Symbol.Sound, receiver);
  ConvertStorage(Database.Data.Tag, uri, Kinds.Symbol.Tag, receiver);
  ConvertStorage(Database.Data.TickingAreas, uri, Kinds.Symbol.Tickingarea, receiver);
}

export function ConvertAllFile(uri: string, receiver: SymbolInformation[]): void {
  ConvertStorage(Database.Data.Blocks, uri, Kinds.Symbol.Block, receiver);
  ConvertStorage(Database.Data.Effects, uri, Kinds.Symbol.Effect, receiver);
  ConvertStorage(Database.Data.Entities, uri, Kinds.Symbol.Entity, receiver);
  ConvertStorage(Database.Data.FakeEntities, uri, Kinds.Symbol.Selector, receiver);
  ConvertStorage(Database.Data.Functions, uri, Kinds.Symbol.Functions, receiver);
  ConvertStorage(Database.Data.Items, uri, Kinds.Symbol.Item, receiver);
  ConvertStorage(Database.Data.Objectives, uri, Kinds.Symbol.Objectives, receiver);
  ConvertStorage(Database.Data.Sounds, uri, Kinds.Symbol.Sound, receiver);
  ConvertStorage(Database.Data.Tag, uri, Kinds.Symbol.Tag, receiver);
  ConvertStorage(Database.Data.TickingAreas, uri, Kinds.Symbol.Tickingarea, receiver);
}

export function ConvertQueried(uri: string, receiver: SymbolInformation[], query: string) {
  switch (query) {
    case 'block':
    case 'blocks':
      return ConvertStorage(Database.Data.Blocks, uri, Kinds.Symbol.Block, receiver);

    case 'effect':
    case 'effects':
      return ConvertStorage(Database.Data.Effects, uri, Kinds.Symbol.Effect, receiver);

    case 'entity':
    case 'entities':
      return ConvertStorage(Database.Data.Entities, uri, Kinds.Symbol.Entity, receiver);

    case 'fake':
    case 'fake entity':
    case 'fake entities':
      return ConvertStorage(Database.Data.FakeEntities, uri, Kinds.Symbol.Selector, receiver);

    case 'function':
    case 'functions':
      return ConvertStorage(Database.Data.Functions, uri, Kinds.Symbol.Functions, receiver);

    case 'item':
    case 'items':
      return ConvertStorage(Database.Data.Items, uri, Kinds.Symbol.Item, receiver);

    case 'objective':
    case 'objectives':
    case 'score':
    case 'scores':
      return ConvertStorage(Database.Data.Objectives, uri, Kinds.Symbol.Objectives, receiver);

    case 'sound':
    case 'sounds':
      return ConvertStorage(Database.Data.Sounds, uri, Kinds.Symbol.Sound, receiver);

    case 'tag':
    case 'tags':
      return ConvertStorage(Database.Data.Tag, uri, Kinds.Symbol.Tag, receiver);

    case 'ticking':
    case 'tickingarea':
    case 'tickingareas':
      return ConvertStorage(Database.Data.TickingAreas, uri, Kinds.Symbol.Tickingarea, receiver);
  }

  ConvertStorageQuery(Database.Data.Blocks, uri, query, Kinds.Symbol.Block, receiver);
  ConvertStorageQuery(Database.Data.Effects, uri, query, Kinds.Symbol.Effect, receiver);
  ConvertStorageQuery(Database.Data.Entities, uri, query, Kinds.Symbol.Entity, receiver);
  ConvertStorageQuery(Database.Data.FakeEntities, uri, query, Kinds.Symbol.Selector, receiver);
  ConvertStorageQuery(Database.Data.Functions, uri, query, Kinds.Symbol.Functions, receiver);
  ConvertStorageQuery(Database.Data.Items, uri, query, Kinds.Symbol.Item, receiver);
  ConvertStorageQuery(Database.Data.Objectives, uri, query, Kinds.Symbol.Objectives, receiver);
  ConvertStorageQuery(Database.Data.Sounds, uri, query, Kinds.Symbol.Sound, receiver);
  ConvertStorageQuery(Database.Data.Tag, uri, query, Kinds.Symbol.Tag, receiver);
  ConvertStorageQuery(Database.Data.TickingAreas, uri, query, Kinds.Symbol.Tickingarea, receiver);
}

export function ConvertStorageQuery<T extends Identifiable & Locatable>(Data: DataCollector<T>, uri: string, query: string, valuekind: SymbolKind, receiver: SymbolInformation[]): void {
  if (uri === '') {
    Data.ForEach((element) => CheckOrAdd(element, query, valuekind, receiver));
  }
  else {
    let Items = Data.GetFromFile(uri);

    if (Items) {
      Items.forEach((value) => CheckOrAdd(value, query, valuekind, receiver));
    }
  }
}

function CheckOrAdd(value: Identifiable & Locatable, query: string, valuekind: SymbolKind, receiver: SymbolInformation[]): void {
  if (Queryable.is(value)) {
    if (value.MatchQuery(query))
      ConvertItem(value, valuekind, receiver);
  }
  else {
    if (value.Identifier.includes(query)) {
      ConvertItem(value, valuekind, receiver);
    }
  }
}

export function ConvertStorage<T extends Identifiable & Locatable>(Data: DataCollector<T>, uri: string, valuekind: SymbolKind, receiver: SymbolInformation[]): void {
  if (uri === '') {
    Data.ForEach((value) => ConvertItem(value, valuekind, receiver));
  }
  else {
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