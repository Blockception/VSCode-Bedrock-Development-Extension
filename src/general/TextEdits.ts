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

import * as vscode from 'vscode';


export module TextEdits {

    //Loops through the text line looking for text to remove
    export function RemoveTextFromLine(TextToRemove : string, line : vscode.TextLine, Collector: vscode.TextEdit[]) : void {
        var Text = line.text;
        var LineIndex = line.lineNumber;

        var Index = Text.indexOf(TextToRemove, 0);

        while (Index > -1) {
            Collector.push(new vscode.TextEdit(new vscode.Range(LineIndex, Index, LineIndex, Index + TextToRemove.length), ""));

            Index = Text.indexOf(TextToRemove, Index + TextToRemove.length);
        }
    }

    //Loops through the text line looking for text to remove
    export function RemoveTextFromDocument(TextToRemove : string, document : vscode.TextDocument, Collector: vscode.TextEdit[]) {
        for (let LineIndex = 0; LineIndex < document.lineCount; LineIndex++) {
            var line = document.lineAt(LineIndex);
            var Text = line.text;
    
            var Index = Text.indexOf(TextToRemove, 0);
    
            while (Index > -1) {
                Collector.push(new vscode.TextEdit(new vscode.Range(LineIndex, Index, LineIndex, Index + TextToRemove.length), ""));
    
                Index = Text.indexOf(TextToRemove, Index + TextToRemove.length);
            }        
        }
    }

    //Loops through the text line looking for text to replace
    export function ReplaceTextFromLine(OldText : string, NewText: string, line : vscode.TextLine, Collector: vscode.TextEdit[]) : void {
        var Text = line.text;
        var LineIndex = line.lineNumber;

        var Index = Text.indexOf(OldText, 0);

        while (Index > -1) {
            Collector.push(new vscode.TextEdit(new vscode.Range(LineIndex, Index, LineIndex, Index + OldText.length), NewText));

            Index = Text.indexOf(OldText, Index + OldText.length);
        }
    }

    //Loops through the text line looking for text to remove
    export function ReplaceTextFromDocument(OldText : string, NewText: string, document : vscode.TextDocument, Collector: vscode.TextEdit[]) {
        for (let LineIndex = 0; LineIndex < document.lineCount; LineIndex++) {
            var line = document.lineAt(LineIndex);
            var Text = line.text;
    
            var Index = Text.indexOf(OldText, 0);
    
            while (Index > -1) {
                Collector.push(new vscode.TextEdit(new vscode.Range(LineIndex, Index, LineIndex, Index + OldText.length), NewText));
    
                Index = Text.indexOf(OldText, Index + OldText.length);
            }        
        }
    }

    //Loop through starting character to filters out empty characters and slashes
    export function TrimStartFromLine(line : vscode.TextLine, Collector: vscode.TextEdit[], ToRemove: string[]){
        var Text = line.text;
        var LineIndex = line.lineNumber;
        var startindex = 0;
        var Loop = true;

        while (Loop) {
            Loop = false;

            ToRemove.forEach(x => {
                if (x == Text.substring(startindex, startindex + x.length)){
                    Loop = true;
                    startindex += x.length;
                }
            });
        }

        //If any unwanted character are found, remove them
        if (startindex > 0){
            Collector.push(new vscode.TextEdit(new vscode.Range(LineIndex, 0, LineIndex, startindex), ""));
        }
    }

    export function TrimEndFromLine(line : vscode.TextLine, Collector: vscode.TextEdit[], ToRemove: string[]) : void {
        var Text = line.text;
        var LineIndex = line.lineNumber;
        var startindex = Text.length - 1;
        var endindex = Text.length;
        startindex = endindex;
        var Loop = true;

        while (Loop) {
            Loop = false;

            ToRemove.forEach(x => {
                if (x == Text.substring(startindex, startindex + x.length)){
                    Loop = true;
                    startindex -= x.length;
                }
            });
        }

        startindex++;

        if (startindex < endindex) {
            Collector.push(new vscode.TextEdit(new vscode.Range(LineIndex, startindex, LineIndex, endindex), ""));
        }   
    }
}