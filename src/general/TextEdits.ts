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