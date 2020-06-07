import { SymbolInformation } from "vscode";
import { DocumentDataCollection } from "../general/include";


export class mcfunctionDatabase {
    //All list of all found tags and their locations
    static Tags : DocumentDataCollection<SymbolInformation> = new DocumentDataCollection<SymbolInformation>();

    //All list of all found selectors and their locations
    static Selectors : DocumentDataCollection<SymbolInformation> = new DocumentDataCollection<SymbolInformation>();

    //All list of all found scores and their locations
    static Scores : DocumentDataCollection<SymbolInformation> = new DocumentDataCollection<SymbolInformation>();

    //All list of all found entities and their locations
    static Entities : DocumentDataCollection<SymbolInformation> = new DocumentDataCollection<SymbolInformation>();

    //All list of all found items and their locations
    static Items : DocumentDataCollection<SymbolInformation> = new DocumentDataCollection<SymbolInformation>();
}