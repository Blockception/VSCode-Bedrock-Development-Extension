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
import { CompletionItemKind } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Database, DataCollector } from "../../Database/include";
import { DataReference } from "../../Database/Types/include";
import { Molang } from "../../include";
import { Manager } from "../../Manager/Manager";
import { GetPreviousWord } from "../../Molang/include";
import { MolangFunctionDataItem } from "../../Molang/MolangData";
import { Kinds } from "../../Types/General/Kinds";
import { CompletionBuilder } from "../Builder";
import { OnCompletionMolangVariable } from "./Variables";

export function OnCompletionEntityEvents(receiver: CompletionBuilder): void {
  Database.Data.General.Entities.ForEach((x) => {
    x.Events.forEach((event) => {
      receiver.Add(event, `The ${x.Identifier} event: ${event}`, Kinds.Completion.Event);
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

  if (Molang.IsMolang(line)) {
    receiver.Add("query", "", CompletionItemKind.Class);
    receiver.Add("variable", "", CompletionItemKind.Variable);
    receiver.Add("math", "", CompletionItemKind.Class);
    receiver.Add("texture", "", CompletionItemKind.Property);
    receiver.Add("geometry", "", CompletionItemKind.Property);
    receiver.Add("temp", "", CompletionItemKind.Variable);
    receiver.Add("this", "", CompletionItemKind.Struct);

    ConvertPrefixed(Manager.Data.Molang.Query, receiver, "query.");
    ConvertPrefixed(Manager.Data.Molang.Math, receiver, "math.");
  }
}

function CreateGeometries(Models: DataCollector<DataReference>, receiver: CompletionBuilder): void {
  Models.ForEach((model) => {
    let data = model.Identifier;
    let index = data.indexOf(".");

    if (index > -1) data = data.substring(index + 1);

    receiver.Add(data, "The geometry of: " + model.Identifier, CompletionItemKind.Property);
  });
}

function Convert(data: MolangFunctionDataItem[], receiver: CompletionBuilder): void {
  for (let I = 0; I < data.length; I++) {
    let Item = data[I];

    receiver.Add(Item.function, Item.documentation, CompletionItemKind.Function);
  }
}

function ConvertPrefixed(data: MolangFunctionDataItem[], receiver: CompletionBuilder, prefix: string): void {
  for (let I = 0; I < data.length; I++) {
    let Item = data[I];

    receiver.Add(prefix + Item.function, Item.documentation, CompletionItemKind.Function);
  }
}
