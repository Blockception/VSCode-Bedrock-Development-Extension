import * as fs from "fs";
import * as fg from "fast-glob";
import * as vscode from "vscode-languageserver-textdocument";
import { Manager } from "../../Manager/Manager";
import { GetFilepath, UniformUrl } from "../../Code/Url";
import { fileURLToPath } from "url";
import { Languages } from "../../Constants";
import { Console } from "../../Console/Console";
import { GetFilename } from "../../Code/File";
import { TextDocument } from "./TextDocument";
import { WorkspaceConfiguration } from "../../Database/Types/WorkspaceData";
import { MCAttributes, MCDefinition, MCIgnore } from "bc-minecraft-project";

/**
 * Returns an usable document interaction from the given data.
 *
 * @param uri The url to the document to retrieve.
 * @param Content The possible content of the document or interface to use
 * @param languageID The Language ID associated to the documentated.
 */
export function GetDocument(uri: string, Content: string | vscode.TextDocument | undefined = undefined, languageID: string = ""): TextDocument {
  let Old = uri;
  uri = GetFilepath(UniformUrl(uri));

  if (languageID === "") {
    languageID = IdentifyDoc(uri);
  }

  if (Content == undefined) {
    let doc = Manager.Data.Documents.get(Old);

    /*if (doc == undefined){
      doc = Manager.Documents.get(uri);
    }*/

    if (doc) {
      //Cached document
      return new CachedDoc(doc);
    }

    let Out: TextDocument | undefined;

    //Reading file
    let path = fileURLToPath(uri);

    try {
      if (fs.existsSync(path)) {
        Content = fs.readFileSync(path, "utf8");
        Out = TextDocument.create(uri, languageID, 1, Content);
      }
    } catch (err) {
      Console.Error(JSON.stringify(path));
    }

    if (Out === undefined) {
      Out = TextDocument.create(uri, languageID, 0, "");
    }

    return Out;
  }
  //Content is provided
  else if (typeof Content === "string") {
    //string provided
    return TextDocument.create(uri, languageID, 1, Content);
  }

  //The interface is provided
  return new CachedDoc(Content);
}

export function getLine(doc: TextDocument, lineIndex: number): string {
  return doc.getText({
    start: { line: lineIndex, character: 0 },
    end: { line: lineIndex, character: Number.MAX_VALUE },
  });
}

/**
 * Returns the language ID based upon the uri
 *
 * @param uri The documents uri
 */
export function IdentifyDoc(uri: string): string {
  if (uri.endsWith(".mcfunction")) return Languages.McFunctionIdentifier;
  if (uri.endsWith(".lang")) return Languages.McLanguageIdentifier;
  if (uri.endsWith(".json")) return Languages.JsonIdentifier;

  if (uri.endsWith(MCAttributes.filename)) return Languages.McProjectIdentifier;
  if (uri.endsWith(MCIgnore.filename)) return Languages.McProjectIdentifier;
  if (uri.endsWith(MCDefinition.filename)) return Languages.McProjectIdentifier;

  return Languages.McOtherIdentifier;
}

/**
 * Loops over all the given documents
 * @param uris
 * @param callback
 */
export function ForEachDocument(uris: string[], callback: (doc: TextDocument) => void) {
  for (let index = 0; index < uris.length; index++) {
    const element = uris[index];
    let doc = GetDocument(element);

    try {
      if (doc) callback(doc);
    } catch (err) {
      Console.Error(GetFilename(doc.uri) + " | " + JSON.stringify(err));
    }
  }
}

export function GetDocuments(folder: string, pattern: string | string[]): string[] {
  let temp: string[] = [];

  if (Array.isArray(pattern)) {
    for (let index = 0; index < pattern.length; index++) {
      const element = pattern[index];
      temp.push(folder + element);
    }
  } else {
    temp.push(folder + pattern);
  }

  return fg.sync(temp, { absolute: true, onlyFiles: true });
}

export class CachedDoc implements TextDocument {
  private doc: TextDocument;

  readonly uri: string;
  readonly languageId: string;
  readonly version: number;
  readonly lineCount: number;

  getText(range?: vscode.Range): string {
    return this.doc.getText(range);
  }

  positionAt(offset: number): vscode.Position {
    return this.doc.positionAt(offset);
  }

  offsetAt(position: vscode.Position): number {
    return this.doc.offsetAt(position);
  }

  getLine(lineIndex: number): string {
    return this.doc.getLine(lineIndex);
  }

  getConfiguration(): WorkspaceConfiguration {
    return this.doc.getConfiguration();
  }

  constructor(doc: vscode.TextDocument) {
    this.doc = TextDocument.wrap(doc);
    this.uri = GetFilepath(UniformUrl(doc.uri));
    this.languageId = doc.languageId;
    this.lineCount = doc.lineCount;
    this.version = doc.version;
  }
}
