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

import { CompletionItemKind, SymbolKind } from "vscode-languageserver";

export namespace Kinds {
  export namespace Symbol {
    export const Block: SymbolKind = SymbolKind.Property;
    export const Boolean: SymbolKind = SymbolKind.Constant;
    export const Coordinate: SymbolKind = SymbolKind.Constant;
    export const Effect: SymbolKind = SymbolKind.Property;
    export const Entity: SymbolKind = SymbolKind.Property;
    export const Event: SymbolKind = SymbolKind.Event;
    export const FakeEntity: SymbolKind = SymbolKind.EnumMember;
    export const Float: SymbolKind = SymbolKind.Constant;
    export const Functions: SymbolKind = SymbolKind.Class;
    export const Gamemode: SymbolKind = SymbolKind.Constant;
    export const Integer: SymbolKind = SymbolKind.Constant;
    export const Item: SymbolKind = SymbolKind.Property;
    export const Objectives: SymbolKind = SymbolKind.Variable;
    export const Selector: SymbolKind = SymbolKind.TypeParameter;
    export const Sound: SymbolKind = SymbolKind.Property;
    export const Tag: SymbolKind = SymbolKind.Property;
    export const Tickingarea: SymbolKind = SymbolKind.Module;
    export const Xp: SymbolKind = SymbolKind.Constant;
  }

  export namespace Completion {
    export const Block: CompletionItemKind = CompletionItemKind.Property;
    export const Boolean: CompletionItemKind = CompletionItemKind.Constant;
    export const Coordinate: CompletionItemKind = CompletionItemKind.Constant;
    export const Effect: CompletionItemKind = CompletionItemKind.Property;
    export const Entity: CompletionItemKind = CompletionItemKind.Property;
    export const Event: CompletionItemKind = CompletionItemKind.Event;
    export const FakeEntity: CompletionItemKind = CompletionItemKind.EnumMember;
    export const Float: CompletionItemKind = CompletionItemKind.Constant;
    export const Functions: CompletionItemKind = CompletionItemKind.Class;
    export const Gamemode: CompletionItemKind = CompletionItemKind.Constant;
    export const Integer: CompletionItemKind = CompletionItemKind.Constant;
    export const Item: CompletionItemKind = CompletionItemKind.Property;
    export const Objectives: CompletionItemKind = CompletionItemKind.Variable;
    export const Selector: CompletionItemKind = CompletionItemKind.TypeParameter;
    export const Sound: CompletionItemKind = CompletionItemKind.Property;
    export const Tag: CompletionItemKind = CompletionItemKind.Property;
    export const Tickingarea: CompletionItemKind = CompletionItemKind.Module;
    export const Xp: CompletionItemKind = CompletionItemKind.Constant;
  }
}
