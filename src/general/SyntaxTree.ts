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

import * as Words from "./Words"
import { TextLine, Position } from "vscode";

export class SyntaxTree {
    public Root: SyntaxItem | undefined;

    constructor() {
        this.Root = undefined;
    }

    setCursor(cursorPos : number) {
        var Item = this.Root;
        while (Item != undefined){
            Item.Text.checkCursor(cursorPos);
            Item = Item.Child;
        }
    }

    static ParseTree(line: TextLine, position: Position): SyntaxTree {
        var NewWords = Words.RangedWord.GetWordsFromRange(line.text, position.character);
        var Out = this.ParseFromWords(NewWords);
        Out.setCursor(position.character);

        return Out;
    }

    //Parses the entire tree
    static ParseEntireTree(line: TextLine): SyntaxTree {
        var index = line.text.indexOf("#");
        var NewWords: Words.RangedWord[]

        if (index < 0) {
            NewWords = Words.RangedWord.GetWords(line.text);
        }
        else {
            NewWords = Words.RangedWord.GetWords(line.text.substring(0, index));
        }


        return this.ParseFromWords(NewWords);
    }

    //Create a syntax tree from the given range words
    static ParseFromWords(Words: Words.RangedWord[]): SyntaxTree {
        var Out = new SyntaxTree();

        if (Words.length == 0)
            return Out;

        var Parent = new SyntaxItem(Words[0], undefined);
        Out.Root = Parent;
        var Child;

        for (var I = 1; I < Words.length; I++) {
            Child = new SyntaxItem(Words[I], undefined);
            Parent.Child = Child;
            Parent = Child;
        }

        return Out;
    }

    //
    GetLast(): SyntaxItem | undefined {
        var Item = this.Root;

        if (Item == undefined)
            return undefined;

        while (Item.Child != undefined){
            Item = Item.Child;
        }

        return Item;
    }
}

export class SyntaxItem {
    public Text: Words.RangedWord;
    public Child: SyntaxItem | undefined;

    constructor(Text: Words.RangedWord, Child: SyntaxItem | undefined) {
        this.Text = Text;
        this.Child = Child;
    }

    Count(): number {
        var Out = 0;

        var Item = this.Child;

        while (Item != undefined) {
            Out++;
            Item = Item.Child;
        }

        return Out;
    }

    IsSelector(): boolean {
        if (this.Text?.text.startsWith("@"))
            return true;

        return false;
    }

    IsJson(): boolean {
        if (this.Text?.text.startsWith("[") || this.Text?.text.startsWith("{"))
            return true;

        return false;
    }

    IsString(): boolean {
        if (this.Text?.text.startsWith('"'))
            return true;

        return false;
    }

    GetAt(amountDown: number): SyntaxItem | undefined {
        if (amountDown == 0)
            return this;

        var Out: SyntaxItem | undefined = this;

        while (Out != undefined) {
            if (amountDown > 0) {
                Out = Out.Child;
                amountDown--;
            }
            else {
                return Out;
            }
        }

        return Out;
    }
}