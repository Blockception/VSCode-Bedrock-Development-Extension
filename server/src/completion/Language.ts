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
import { TextDocument, Position } from "vscode-languageserver-textdocument";
import { getLine } from "../code/include";

export function OnCompletionLanguage(doc: TextDocument, pos: Position, receiver: CompletionList): void {
  const cursor = pos.character;

  if (cursor <= 0) {
    //key or comment
    receiver.items.push(
      {
        label: "###",
        documentation: "Comment",
        kind: CompletionItemKind.Snippet,
      },
      {
        label: "###region",
        documentation: "Region",
        kind: CompletionItemKind.Snippet,
        insertText: "###region example\n\n###endregion",
      }
    );

    return;
  }

  const line = getLine(doc, pos.line);

  //in comment
  if (isIn("#", cursor, line)) {
    return;
  }

  if (isIn("=", cursor, line)) {
    receiver.items.push(
      { label: "Black §0", kind: CompletionItemKind.Color, insertText: "§0" },
      { label: "Dark Blue §1", kind: CompletionItemKind.Color, insertText: "§1" },
      { label: "Dark Green §2", kind: CompletionItemKind.Color, insertText: "§2" },
      { label: "Dark Aqua §3", kind: CompletionItemKind.Color, insertText: "§3" },
      { label: "Dark Red §4", kind: CompletionItemKind.Color, insertText: "§4" },
      { label: "Dark Purple §5", kind: CompletionItemKind.Color, insertText: "§5" },
      { label: "Gold §6", kind: CompletionItemKind.Color, insertText: "§6" },
      { label: "Gray §7", kind: CompletionItemKind.Color, insertText: "§7" },
      { label: "Dark Gray §8", kind: CompletionItemKind.Color, insertText: "§8" },
      { label: "Blue §9", kind: CompletionItemKind.Color, insertText: "§9" },
      { label: "Green §a", kind: CompletionItemKind.Color, insertText: "§a" },
      { label: "Aqua §b", kind: CompletionItemKind.Color, insertText: "§b" },
      { label: "Red §c", kind: CompletionItemKind.Color, insertText: "§c" },
      { label: "Light Purple §d", kind: CompletionItemKind.Color, insertText: "§d" },
      { label: "Yellow §e", kind: CompletionItemKind.Color, insertText: "§e" },
      { label: "White §f", kind: CompletionItemKind.Color, insertText: "§f" },

      { label: "Reset §r", kind: CompletionItemKind.Color, insertText: "§r" },
      { label: "Italic §o", kind: CompletionItemKind.Color, insertText: "§o" },
      { label: "Bold §l", kind: CompletionItemKind.Color, insertText: "§l" },
      { label: "Random Symbols §k", kind: CompletionItemKind.Color, insertText: "§k" }
    );

    return;
  }

  receiver.items.push({ label: "=", kind: CompletionItemKind.Snippet });
}

function isIn(text: string, index: number, inText: string): boolean {
  let findIndex = inText.indexOf(text);

  if (findIndex < 0) return false;

  if (index > findIndex) return true;

  return false;
}
