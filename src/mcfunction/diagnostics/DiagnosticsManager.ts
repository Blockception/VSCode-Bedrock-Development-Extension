import * as vscode from 'vscode';
import * as FCD from "./FunctionCommandDiagnostics"
import * as SD from "./SelectorDiagnostics"
import { SyntaxTree, SyntaxItem } from '../../general/include';

export class DiagnosticsManager {
    private Items : Map<string, DiagnosticProvider>;

    constructor(){
        this.Items = new  Map<string, DiagnosticProvider>();
    }

    hasDiagnostic(Item : SyntaxItem) {
        return this.Items.has(Item.Text.text);
    }

    get(Item : SyntaxItem) : DiagnosticProvider | undefined {
        return this.Items.get(Item.Text.text);
    }

    set(DiagnosticProvider : DiagnosticProvider, keywords : string[]) : void {
        keywords.forEach(word => this.Items.set(word, DiagnosticProvider));
    }
}


export interface DiagnosticProvider {
    //Provides diagnostics of the current syntax tree
    provideDiagnostic(item: SyntaxItem, lineIndex : number, collector : vscode.Diagnostic[], dm : DiagnosticsManager, document: vscode.TextDocument) : void;
}