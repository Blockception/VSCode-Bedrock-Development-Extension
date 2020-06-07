import * as vscode from "vscode";
import * as constants from "../constants";
import { DocumentData, DocumentDataCollection } from "../general/include";
import * as SymbolProvider from "./SymbolProvider"

export function activate(context: vscode.ExtensionContext) {
    var RefernceProvider = new McfunctionReferenceProvider();

    context.subscriptions.push(
        vscode.languages.registerReferenceProvider(constants.McLanguageIdentifier, RefernceProvider)
    );
}

export class McfunctionReferenceProvider implements vscode.ReferenceProvider {
    //A copy of itself in static memory to provide itself to other classes
    static instance: McfunctionReferenceProvider | undefined;

    constructor() {
        McfunctionReferenceProvider.instance = this;
    }

    provideReferences(document: vscode.TextDocument, position: vscode.Position, context: vscode.ReferenceContext, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Location[]> {
        var Items = new Array<vscode.Location>();


        return
    }
}