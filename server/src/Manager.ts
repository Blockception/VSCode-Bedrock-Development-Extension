import { TextDocument } from "vscode-languageserver-textdocument";
import { TextDocuments } from "vscode-languageserver";

export class Manager {
    //The document manager
    static Documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

    static hasConfigurationCapability: boolean = false;
    static hasWorkspaceFolderCapability: boolean = false;
    static hasDiagnosticRelatedInformationCapability: boolean = false;
}