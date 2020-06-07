import * as vscode from "vscode";
import * as constants from "../constants";
import { DocumentData, DocumentDataCollection } from "../general/include";

export function activate(context: vscode.ExtensionContext) {
    var SymbolProvider = new McfunctionSymbolProvider();

    context.subscriptions.push(
        vscode.languages.registerDocumentSymbolProvider(constants.McLanguageIdentifier, SymbolProvider),
        vscode.languages.registerWorkspaceSymbolProvider(SymbolProvider)
    );

    //SymbolProvider.traverseWorkspaceSymbols();
}

export class McfunctionSymbolProvider implements vscode.DocumentSymbolProvider, vscode.WorkspaceSymbolProvider {
    //A copy of itself in static memory to provide itself to other classes
    static instance: McfunctionSymbolProvider;

    //The data of the object
    public Data: DocumentDataCollection<vscode.SymbolInformation>;

    constructor() {
        McfunctionSymbolProvider.instance = this;
        this.Data = new DocumentDataCollection<vscode.SymbolInformation>();
    }

    public traverseWorkspaceSymbols(): void {
        vscode.workspace.workspaceFolders?.forEach((x) => {
            vscode.workspace.fs.readDirectory(x.uri).then((Items) => Items.forEach((item) => this.traverseFolder(item, x.uri.fsPath)));
        });
    }

    private traverseFolder(path: [string, vscode.FileType], folder: string) {
        path[0] = folder + "\\" + path[0];

        switch (path[1]) {
            case vscode.FileType.File:
                if (path[0].endsWith(".mcfunction")) {
                    vscode.workspace.openTextDocument(path[0]).then((doc) => {
                        var Items = new Array<vscode.SymbolInformation>();

                        InternalprovideDocumentSymbols(doc, Items);
                        var Temp = this.Data.Get(doc.uri);
                        Temp.Values = Items;
                    });
                }

                break;
            case vscode.FileType.Directory:
                var uri = vscode.Uri.file(path[0]);
                vscode.workspace.fs.readDirectory(uri).then((Items) => Items.forEach((item) => this.traverseFolder(item, uri.fsPath)));
                break;
        }
    }

    public provideWorkspaceSymbols(query: string, token: vscode.CancellationToken): vscode.ProviderResult<vscode.SymbolInformation[]> {
        var Items = new Array<vscode.SymbolInformation>();
        if (query === ""){
            return Items;
        }

        this.Data.forEach((x) => {
            x.Values.forEach(y=>{
                if (y.name.match(query)) {
                    Items.push(y);
                }
            });
        });

        return Items;
    }

    public provideDocumentSymbols(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.SymbolInformation[] | vscode.DocumentSymbol[]> {
        var Filepath = document.uri.fsPath;
        var Items = new Array<vscode.SymbolInformation>();

        //mc functions
        if (Filepath.endsWith(".mcfunction")) {
            InternalprovideDocumentSymbols(document, Items);
            var Temp = this.Data.Get(document.uri);
            Temp.Values = Items;
        }

        return Items;
    }
}

function InternalprovideDocumentSymbols(document: vscode.TextDocument, Collector: vscode.SymbolInformation[]) {
    var Filepath = document.uri.fsPath;

    var index = Filepath.indexOf("\\functions\\");

    var folder: string;
    var filename: string;
    var Container: string;

    if (index > 0) {
        folder = Filepath.substring(0, index + 1);
        index = Filepath.lastIndexOf("\\");
    } else {
        index = Filepath.lastIndexOf("\\");
        folder = Filepath.substring(0, index + 1);
    }

    filename = Filepath.substring(index + 1, Filepath.length);
    Container = Filepath.replace(filename, "").replace(folder, "");
    filename = filename.replace(".mcfunction", "");

    var Item = new vscode.SymbolInformation(filename, vscode.SymbolKind.Function, "", new vscode.Location(document.uri, new vscode.Position(0, 0)));
    Collector.push(Item);
    examineMcfunctionLines(document, filename, Container, Collector);
}

function examineMcfunctionLines(document: vscode.TextDocument, filename: string, Container: string, Collector: vscode.SymbolInformation[]): void {
    for (var I = 0; I < document.lineCount; I++) {
        var Line = document.lineAt(I);
        var Text = Line.text;

        //Create a symbol for the region
        if (Text.match("^\\#[ \t]*region")) {
            var index = Text.indexOf("region");

            if (index > 0) {
                var RegionText = Text.substring(index + 6, Text.length).trim();
                if (RegionText == "") {
                    RegionText == "region_" + I;
                }

                Collector.push(new vscode.SymbolInformation(RegionText, vscode.SymbolKind.Namespace, Container, new vscode.Location(document.uri, new vscode.Position(I, 0))));
            }
        }

        //scoreboard objectives created
        var index = Text.indexOf("scoreboard objectives add ");
        if (index > -1) {
            createScoreboardObject(Text, new vscode.Location(document.uri, new vscode.Range(I, index + 26, I, index + 26)), Collector);
        }

        getSelector(Text, document, I, Collector);
    }
}

function createScoreboardObject(text: string, location: vscode.Location, Collector: vscode.SymbolInformation[]): void {
    var StartIndex = text.indexOf("scoreboard objectives add ");
    var Index = text.indexOf(" ", StartIndex + 26);

    if (Index < 0) return;

    var Name = text.substring(StartIndex + 26, Index).trim();

    Collector.push(new vscode.SymbolInformation(Name, vscode.SymbolKind.Variable, "", location));
}

function getSelector(text: string, document: vscode.TextDocument, lineIndex: number, Collector: vscode.SymbolInformation[]): void {
    var index = text.indexOf("@");
    var endindex: number;

    while (index > -1) {
        if (text.charAt(index + 2) == "[") {
            endindex = text.indexOf("]");

            if (endindex < 0) {
                endindex = index + 2;
            } else {
                endindex += 1;
            }
        } else {
            endindex = index + 2;
        }

        var Item = new vscode.SymbolInformation(`selector: ${text.substring(index, endindex)}`, vscode.SymbolKind.Variable, "", new vscode.Location(document.uri, new vscode.Range(lineIndex, index, lineIndex, endindex)));

        Collector.push(Item);

        index = text.indexOf("@a", endindex);
    }
}
