import * as vscode from 'vscode';
import { SyntaxTree, SyntaxItem, RangedWord } from '../../general/include';
export * from './DiagnosticsFunctions'

export class DiagnosticsManager {
    private Items : Map<string, DiagnosticProvider>;

    public BooleanDiagnoser : DiagnosticProvider | undefined;
    public BlockDiagnoser : DiagnosticProvider | undefined; //TODO
    public CoordinateDiagnoser : DiagnosticProvider | undefined;
    public EffectDiagnoser : DiagnosticProvider | undefined; //TODO
    public FloatDiagnoser : DiagnosticProvider | undefined; //TODO
    public IntegerDiagnoser : DiagnosticProvider | undefined; //TODO
    public ItemDiagnoser : DiagnosticProvider | undefined; //TODO
    public ItemComponentDiagnoser : DiagnosticProvider | undefined; //TODO
    public ParticleDiagnoser : DiagnosticProvider | undefined; //TODO
    public SelectorDiagnoser : DiagnosticProvider | undefined;
    public ScoreDiagnoser : DiagnosticProvider | undefined; //TODO
    public SoundDiagnoser : DiagnosticProvider | undefined; //TODO
    public StringDiagnoser : DiagnosticProvider | undefined; //TODO

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


