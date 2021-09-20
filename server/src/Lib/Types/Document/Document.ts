import * as fs from "fs";
import * as vscode from "vscode-languageserver-textdocument";
import { Manager } from "../../Manager/Manager";
import { fileURLToPath } from "url";
import { Languages } from "../../Constants";
import { GetFilename } from "../../Code/File";
import { TextDocument } from "./TextDocument";
import { MCAttributes, MCDefinition, MCIgnore } from "bc-minecraft-project";
import { Glob } from "../../Glob/Glob";

/**Returns an usable document interaction from the given data.
 *
 * @param uri The url to the document to retrieve.
 * @param Content The possible content of the document or interface to use
 * @param languageID The Language ID associated to the documentated.
 */
export function GetDocument(uri: string, Content: string | vscode.TextDocument | undefined = undefined, languageID: string = ""): TextDocument {
  const Old = uri;

  if (languageID === "") {
    languageID = IdentifyDoc(uri);
  }

  if (typeof Content === "undefined") {
    const doc = Manager.Documents.get(Old);

    //Cached document
    if (doc) return TextDocument.wrap(doc);

    const content = GetDocumentContent(uri);

    if (content) {
      return TextDocument.create(uri, languageID, 1, content);
    }

    //We have tried all methods of retrieving data so far
    return TextDocument.create(uri, languageID, 0, "");
  }
  //Content is provided
  else if (typeof Content === "string") {
    //string provided
    return TextDocument.create(uri, languageID, 1, Content);
  }

  //The interface is provided
  return TextDocument.wrap(Content);
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
  if (uri.endsWith(".molang")) return Languages.McMolangIdentifier;

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
    const doc = GetDocument(element);

    try {
      if (doc) callback(doc);
    } catch (err) {
      console.error(GetFilename(doc.uri) + " | " + JSON.stringify(err));
    }
  }
}

/**
 *
 * @param folder
 * @param pattern
 * @param ignores
 * @returns
 */
export function GetDocuments(folder: string, pattern: string | string[], ignores: string[] | undefined = undefined): string[] {
  return Glob.GetFiles(pattern, ignores, folder);
}

/**
 *
 * @param uri
 * @returns
 */
export function GetDocumentContent(uri: string): string | undefined {
  //Reading file
  let path = fileURLToPath(uri);

  if (fs.existsSync(path)) {
    let content: string | undefined;
    try {
      content = fs.readFileSync(path, "utf8");
    } catch (err) {
      console.error("couldn't read: " + path + "\n\tError thrown" + JSON.stringify(err));
    }

    return content;
  }

  return undefined;
}
