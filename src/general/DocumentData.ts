import * as vscode from 'vscode';


export class DocumentDataCollection<T> {
    private Items : Map<vscode.Uri, DocumentData<T>>;

    constructor(){
        this.Items = new Map<vscode.Uri, DocumentData<T>>();
    }

    public Get(key: vscode.Uri) : DocumentData<T>{
        var Out = this.Items.get(key);

        if (Out == undefined) {
            Out = new DocumentData<T>();
            this.Items.set(key, Out);
        }

        return Out;
    }

    public Set(key : vscode.Uri, value : DocumentData<T>) {
        this.Items.set(key, value);
    }  

    public forEach(callbackfn : (value: DocumentData<T>, key: vscode.Uri, map: Map<vscode.Uri, DocumentData<T>>) => void) {
        this.Items.forEach(callbackfn);
    }
}

export class DocumentData<T> {
    public Values : T[];

    constructor(){
        this.Values = new Array<T>();
    }
}