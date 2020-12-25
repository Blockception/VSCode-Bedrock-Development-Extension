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
import { MarkupContent, CompletionItem, CompletionItemKind, CompletionList } from "vscode-languageserver";


function AttributeCompletion(label: string, documentation: string | MarkupContent): CompletionItem {
  return {
    label: label,
    insertText: label + "=",
    kind: CompletionItemKind.Property,
    documentation: documentation,
  };
}

//Doesnt do scores and doesnt need to
export function provideSelectorAttributeCompletion(receiver: CompletionList, forEntities: boolean): void {
  receiver.items.push(
    AttributeCompletion("c", "limits the amount of entities/player to be targeted"),
    AttributeCompletion("dx", "The length of the box over the axis X"),
    AttributeCompletion("dy", "The length of the box over the axis Y"),
    AttributeCompletion("dz", "The length of the box over the axis Z"),
    AttributeCompletion("family", "Tests whether or not the target has a given family type. Can be either string or single word"),
    AttributeCompletion("l", "The maximum amount of XP the target has"),
    AttributeCompletion("lm", "The minimum amount of XP the target has"),
    AttributeCompletion("m", "The gamemode of the player"),
    AttributeCompletion("name", "Tests whether or not the target has a given name. Can be either string or single word"),
    AttributeCompletion("r", "The maximum distance to the target"),
    AttributeCompletion("rm", "The minimum distance to the target"),
    AttributeCompletion("rx", "The maximum vertical rotation"),
    AttributeCompletion("rxm", "The minimum vertical rotation"),
    AttributeCompletion("ry", "The maximum horizontal rotation"),
    AttributeCompletion("rym", "The minimum horizontal rotation"),
    {
      label: "scores",
      insertText: "scores" + "={",
      kind: CompletionItemKind.Property,
      documentation: "The testing of scores",
    },
    AttributeCompletion("tag", "Tests if the target has or does not have the specified tag"),
    AttributeCompletion("x", "The x coordinate this selector works from, can be relative, but not local"),
    AttributeCompletion("y", "The y coordinate this selector works from, can be relative, but not local"),
    AttributeCompletion("y", "The z coordinate this selector works from, can be relative, but not local")
  );

  if (forEntities) {
    receiver.items.push(AttributeCompletion("type", "Tests if the target has or does not have the specified type"));
  }
}

