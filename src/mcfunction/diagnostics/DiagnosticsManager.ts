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
export * from './DiagnosticsFunctions'
import { SyntaxItem } from '../../general/include';
import { SelectorDiagnosticProvider } from './types/SelectorDiagnostics';
import { CoordinateDiagnosticProvider } from './types/CoordinateDiagnostics';
import { BooleanDiagnosticProvider } from './types/BooleanDiagnostics';
import { FloatDiagnosticProvider } from './types/FloatDiagnostics';
import { IntegerDiagnosticProvider } from './types/IntegerDiagnostics';
import { JsonTextDiagnoserProvider } from './types/JsonTextDiagnoser';
import { ScoresDiagnosticProvider } from './types/ScoresDiagnostics';
import { TagDiagnosticProvider } from './commands/tagDiagnostics';

export class DiagnosticsManager {
    private Items : Map<string, DiagnosticProvider>;

    public BooleanDiagnoser : DiagnosticProvider;
    public BlockDiagnoser : DiagnosticProvider | undefined; //TODO
    public CoordinateDiagnoser : DiagnosticProvider;
    public EffectDiagnoser : DiagnosticProvider | undefined; //TODO
    public EntityDiagnoser : DiagnosticProvider | undefined; //TODO
    public FloatDiagnoser : DiagnosticProvider;
    public IntegerDiagnoser : DiagnosticProvider;
    public ItemDiagnoser : DiagnosticProvider | undefined; //TODO
    public JsonItemComponentDiagnoser : DiagnosticProvider | undefined; //TODO
    public JsonTextDiagnoser : DiagnosticProvider;
    public TickingAreaDiagnoser : DiagnosticProvider | undefined; //TODO
    public ParticleDiagnoser : DiagnosticProvider | undefined; //TODO
    public SelectorDiagnoser : DiagnosticProvider;
    public ScoreDiagnoser : ScoresDiagnosticProvider;
    public SoundDiagnoser : DiagnosticProvider | undefined; //TODO
    public StringDiagnoser : DiagnosticProvider | undefined; //TODO
    public TagDiagnoser : TagDiagnosticProvider;

    constructor(){
        this.Items = new  Map<string, DiagnosticProvider>();
        //set up base types diagnosers
        this.SelectorDiagnoser = new SelectorDiagnosticProvider();
        this.CoordinateDiagnoser = new CoordinateDiagnosticProvider();
        this.BooleanDiagnoser = new BooleanDiagnosticProvider();
        this.FloatDiagnoser = new FloatDiagnosticProvider();
        this.IntegerDiagnoser = new IntegerDiagnosticProvider();
        this.JsonTextDiagnoser = new JsonTextDiagnoserProvider();
        this.ScoreDiagnoser = new ScoresDiagnosticProvider();
        this.TagDiagnoser = new TagDiagnosticProvider();
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


