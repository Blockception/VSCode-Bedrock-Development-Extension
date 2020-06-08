import * as vscode from 'vscode';
import { SyntaxTree, SyntaxItem, RangedWord } from '../../general/include';
export * from './DiagnosticsFunctions'

export class DiagnosticsManager {
    private Items : Map<string, DiagnosticProvider>;

    public BooleanDiagnoser : DiagnosticProvider | undefined;
    public BlockDiagnoser : DiagnosticProvider | undefined;
    public CoordinateDiagnoser : DiagnosticProvider | undefined;
    public EffectDiagnoser : DiagnosticProvider | undefined;
    public IntegerDiagnoser : DiagnosticProvider | undefined;
    public ItemDiagnoser : DiagnosticProvider | undefined;
    public SelectorDiagnoser : DiagnosticProvider | undefined;    

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


