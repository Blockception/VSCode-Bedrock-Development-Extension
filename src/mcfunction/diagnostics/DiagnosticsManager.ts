import * as vscode from 'vscode';
import { SyntaxTree, SyntaxItem } from '../../general/include';

export class DiagnosticsManager {
    private Items : Map<string, DiagnosticProvider>;

    public SelectorDiagnoser : DiagnosticProvider | undefined;
    public CoordinateDiagnoser : DiagnosticProvider | undefined;
    public BooleanDiagnoser : DiagnosticProvider | undefined;

    constructor(){
        this.Items = new  Map<string, DiagnosticProvider>();
        this.SelectorDiagnoser = undefined;
        this.CoordinateDiagnoser = undefined;
        this.BooleanDiagnoser = undefined;
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