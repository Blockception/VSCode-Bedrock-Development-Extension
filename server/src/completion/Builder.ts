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
import { CompletionItem, CompletionItemKind, MarkupContent } from "vscode-languageserver-types";
import { DataCollector } from "../database/include";
import { Item } from "../types/general/include";
import { Documentable, Identifiable, Locatable } from "../types/minecraft/Interfaces/include";

export class CompletionBuilder {
  public items: CompletionItem[];
  public OnNewItem: ((NewItem: CompletionItem) => void) | undefined;

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
  Add(
    label: string,
    documentation: string | MarkupContent,
    kind: CompletionItemKind = CompletionItemKind.Keyword,
    insertText: string | undefined = undefined
  ): CompletionItem {
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
