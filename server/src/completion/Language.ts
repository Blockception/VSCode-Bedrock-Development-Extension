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
import { TextDocument, Position } from "vscode-languageserver-textdocument";
import { getLine } from "../code/include";
import { CompletionBuilder } from "./Builder";

export function OnCompletionLanguage(doc: TextDocument, pos: Position, receiver: CompletionBuilder): void {
  const cursor = pos.character;

  if (cursor <= 0) {
    //key or comment
    receiver.Add("###", "comment", CompletionItemKind.Snippet);
    receiver.Add("###region", "Region", CompletionItemKind.Snippet, "###region example\n\n###endregion");

    return;
  }

  const line = getLine(doc, pos.line);

  //in comment
  if (isIn("#", cursor, line)) {
    return;
  }

  if (isIn("=", cursor, line)) {
      receiver.Add("Black §0", "The colour: Black", CompletionItemKind.Color, "§0");
      receiver.Add("Dark Blue §1", "The colour: Dark blue", CompletionItemKind.Color,  "§1" );
      receiver.Add("Dark Green §2", "The colour: Dark green", CompletionItemKind.Color,  "§2");,
      receiver.Add("Dark Aqua §3", "The colour: Dark aqua", CompletionItemKind.Color,  "§3" );
      receiver.Add("Dark Red §4", "The colour: Dark red", CompletionItemKind.Color, "§4" );
      receiver.Add("Dark Purple §5", "The colour: Dark purple", CompletionItemKind.Color, "§5" );
      receiver.Add("Gold §6", "The colour: Gold", CompletionItemKind.Color, "§6" );
      receiver.Add("Gray §7", "The colour: Gray", CompletionItemKind.Color, "§7" );
      receiver.Add("Dark Gray §8", "The colour: Dark gray", CompletionItemKind.Color, "§8" );
      receiver.Add("Blue §9", "The colour: Blue", CompletionItemKind.Color, "§9" );
      receiver.Add("Green §a", "The colour: Green", CompletionItemKind.Color, "§a" );
      receiver.Add("Aqua §b", "The colour: Aqua", CompletionItemKind.Color, "§b" );
      receiver.Add("Red §c", "The colour: Red", CompletionItemKind.Color, "§c" );
      receiver.Add("Light Purple §d", "The colour: Light purple", CompletionItemKind.Color, "§d" );
      receiver.Add("Yellow §e", "The colour: Yellow", CompletionItemKind.Color, "§e" );
      receiver.Add("White §f", "The colour: White", CompletionItemKind.Color, "§f" );

      receiver.Add("Reset §r", "Resets the current formatting of text", CompletionItemKind.Color, "§r" );
      receiver.Add("Italic §o", "Makes the text from this point italic", CompletionItemKind.Color, "§o" );
      receiver.Add("Bold §l", "Makes the text from this point bold", CompletionItemKind.Color, "§l" );
      receiver.Add("Random Symbols §k", "Makes the text from this point random symbols", CompletionItemKind.Color, "§k");

    return;
  }

  receiver.Add("=", "start of the value", CompletionItemKind.Snippet);
}

function isIn(text: string, index: number, inText: string): boolean {
  let findIndex = inText.indexOf(text);

  if (findIndex < 0) return false;

  if (index > findIndex) return true;

  return false;
}
