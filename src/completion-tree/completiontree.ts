import * as vscode from "vscode";

//The class that saves the complete completion tree
export class CompletionTree {
    ColMap : Map<string, CompletionItemCollection>;

    constructor(){
        this.ColMap = new Map<string, CompletionItemCollection>();
    }

    //Add the given completion item to the collection
    Add(item: CompletionItem){
        var Key = item.Words[0];

        if (!this.ColMap.has(Key)){
            this.ColMap.set(Key, new CompletionItemCollection());
        }

        this.ColMap.get(Key)?.Add(item);
    }

    Get(Words : string[], receiver: vscode.CompletionList){
        var Key = Words[0];

        if (this.ColMap.has(Key)){
            this.ColMap.set(Key, new CompletionItemCollection());
        }
    }
}

//A collection of items that start with the same word
export class CompletionItemCollection {
    Items: CompletionItem[]; 

    constructor(){
        this.Items = new Array();
    }

    Add(item: CompletionItem){
        this.Items.push(item);
    }

    Get(Words : string[], receiver: vscode.CompletionList){
        for (let index = 0; index < this.Items.length; index++) {
            var element = this.Items[index];
            if (element.isMatch(Words)){
                element.items.forEach(i => receiver.items.push(i));                
            }
        }
    }
}

//A single item
export class CompletionItem {
    Words : string[];
    items: vscode.CompletionItem[];

    constructor(Words: string[], items : vscode.CompletionItem[]){
        this.Words = Words;
        this.items = items;
    }

    isMatch(Words: string[]) : boolean {
        if (Words.length != this.Words.length)
            return false;

        var length = Words.length;

        for (let index = 0; index < length; index++){
            if (Words[index] != this.Words[index])
                return false;
        }

        return true;
    }
}