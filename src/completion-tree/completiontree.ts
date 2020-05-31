import * as vscode from "vscode";


export class CompletionTree {
    ColMap : { [key: string]: CompletionItemCollection };

    constructor(){
        this.ColMap = { };
    }

    Add(item: CompletionItem){

    }
}

export class CompletionItemCollection {


    Add(item: CompletionItem){

    }
}

export class CompletionItem {
    Words : string[];
    item: vscode.CompletionItem;

    constructor(Words: string[], item : vscode.CompletionItem){
        this.Words = Words;
        this.item = item;
    }
}