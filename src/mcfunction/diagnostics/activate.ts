import * as vscode from 'vscode';
import { SyntaxTree } from '../../general/include';
import { DiagnosticProvider } from './DiagnosticsManager';
import * as Diagnostics from "./Diagnostics";
import * as Commands from "./commands/activate";
import { SelectorDiagnosticProvider } from './SelectorDiagnostics';
import { CoordinateDiagnosticProvider } from './CoordinateDiagnostics';
import { BooleanDiagnosticProvider } from './BooleanDiagnostics';
import { FloatDiagnosticProvider } from './FloatDiagnostics';
import { IntegerDiagnosticProvider } from './IntegerDiagnostics';
import { JsonTextDiagnoserProvider } from './JsonTextDiagnoser';

export function activate(context: vscode.ExtensionContext) {
    var Manager = Diagnostics.Manager;
    console.log("activating mcfunction diagnostics");
    
    //set up base types diagnosers
    Manager.SelectorDiagnoser = new SelectorDiagnosticProvider();
    Manager.CoordinateDiagnoser = new CoordinateDiagnosticProvider();
    Manager.BooleanDiagnoser = new BooleanDiagnosticProvider();
    Manager.FloatDiagnoser = new FloatDiagnosticProvider();
    Manager.IntegerDiagnoser = new IntegerDiagnosticProvider();
    Manager.JsonTextDiagnoser = new JsonTextDiagnoserProvider();

    //activate commands
    Commands.activate(Manager);

    //If window is open, create new diagnostics
	if (vscode.window.activeTextEditor) {
		updateDiagnostics(vscode.window.activeTextEditor.document, Diagnostics.collection);
    }

    //Register events
	context.subscriptions.push(
        //update
        vscode.workspace.onDidChangeTextDocument(e => updateDiagnostics(e.document, Diagnostics.collection)),
        //when window is changed
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                updateDiagnostics(editor.document, Diagnostics.collection);
            }
        })
    );
}

//Updates the content of the collection of diagnostis for the specified document
function updateDiagnostics(document : vscode.TextDocument, collection : vscode.DiagnosticCollection){
    if (!document.uri.fsPath.endsWith(".mcfunction"))
        return;

    console.log("running diagnostics start:\t" + document.fileName);

    var docCollection = new Array<vscode.Diagnostic>();
    var Diagnoser : DiagnosticProvider | undefined;
     
    for (var index = 0; index < document.lineCount; index++){
        var Line = document.lineAt(index);

        if (Line.text == "" || Line.text.startsWith("#"))
            continue;
        
        var Tree : SyntaxTree = SyntaxTree.ParseEntireTree(Line);
        var Item = Tree.Root;
        
        if (Item != undefined){
            Diagnoser = Diagnostics.Manager.get(Item);

            if (Diagnoser != undefined) {
                Diagnoser.provideDiagnostic(Item, index, docCollection, Diagnostics.Manager, document);
            }
        }
    }

    collection.set(document.uri, docCollection);
    console.log("running diagnostics done:\t" + document.fileName);
}