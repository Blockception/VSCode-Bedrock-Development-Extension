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
import { CompletionItemKind, CompletionList } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { receiveMessageOnPort } from "worker_threads";
import { Database, DataCollector } from "../../database/include";
import { DataReference } from "../../database/Types/include";
import { molang } from "../../include";
import { Manager } from "../../manager/Manager";
import { GetPreviousWord } from "../../molang/include";
import { MolangFunctionDataItem } from "../../molang/MolangData";
import { Entity } from "../../types/general/include";
import { Kinds } from "../../types/general/Kinds";
import { Completion } from "../Functions";
import { OnCompletionMolangVariable } from "./Variables";

export function OnCompletionEntityEvents(receiver: CompletionBuilder): void {
  Database.Data.General.Entities.ForEach((x) => {
    x.Events.forEach((event) => {
      receiver.items.push({
        label: event,
        documentation: { kind: "markdown", value: `The ${x.Identifier} event: ${event}` },
        kind: Kinds.Completion.Event,
      });
    });
  });
}

export function OnCompletionMolang(line: string, cursor: number, doc: TextDocument, receiver: CompletionBuilder): void {
  let Word = GetPreviousWord(line, cursor);

  switch (Word.toLowerCase()) {
    case "query":
      return Convert(Manager.Data.Molang.Query, receiver);

    case "math":
      return Convert(Manager.Data.Molang.Math, receiver);

    case "geometry":
      return CreateGeometries(Database.Data.Resourcepack.Models, receiver);

    case "variable":
      return OnCompletionMolangVariable(doc, receiver);

    case "texture":
    case "temp":
  }

  if (molang.IsMolang(line)) {
    receiver.items.push(
      { label: "query", kind: CompletionItemKind.Class },
      { label: "variable", kind: CompletionItemKind.Variable },
      { label: "math", kind: CompletionItemKind.Class },
      { label: "texture", kind: CompletionItemKind.Property },
      { label: "geometry", kind: CompletionItemKind.Property },
      { label: "temp", kind: CompletionItemKind.Variable },
      { label: "this", kind: CompletionItemKind.Struct }
    );

    ConvertPrefixed(Manager.Data.Molang.Query, receiver, "query.");
    ConvertPrefixed(Manager.Data.Molang.Math, receiver, "math.");
  }
}

function CreateGeometries(Models: DataCollector<DataReference>, receiver: CompletionBuilder): void {
  Models.ForEach((model) => {
    let data = model.Identifier;
    let index = data.indexOf(".");

    if (index > -1) data = data.substring(index + 1);

    receiver.items.push({
      label: data,
      documentation: "The geometry of: " + model.Identifier,
      kind: CompletionItemKind.Property,
    });
  });
}

function Convert(data: MolangFunctionDataItem[], receiver: CompletionBuilder): void {
  for (let I = 0; I < data.length; I++) {
    let Item = data[I];

    receiver.items.push({
      label: Item.function,
      documentation: { kind: "markdown", value: Item.documentation },
      kind: CompletionItemKind.Function,
    });
  }
}

function ConvertPrefixed(data: MolangFunctionDataItem[], receiver: CompletionBuilder, prefix: string): void {
  for (let I = 0; I < data.length; I++) {
    let Item = data[I];

    receiver.items.push({
      label: prefix + Item.function,
      documentation: { kind: "markdown", value: Item.documentation },
      kind: CompletionItemKind.Function,
    });
  }
}
