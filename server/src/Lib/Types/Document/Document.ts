import * as fs from "fs";
import * as vscode from "vscode-languageserver-textdocument";
import { Manager } from "../../Manager/Manager";
import { TextDocument } from "./TextDocument";
import { MCAttributes, MCDefinition, MCIgnore } from "bc-minecraft-project";
import { HandleError } from "../../Code/Error";
import { Fs, Vscode } from "../../Code/Url";
import { ProgressBar } from "../Progress/ProgressBar";
import { QueueProcessor } from "@daanv2/queue-processor";
import { Languages } from "@blockception/shared";

type ContentType = string | vscode.TextDocument | undefined;

/**Returns an usable document interaction from the given data.
 * @param uri The url to the document to retrieve.
 * @param Content The possible content of the document or interface to use
 * @param languageID The Language ID associated to the documented.
 * @returns Returns a textdocument or undefined if something went wrong*/
export function GetDocument(uri: string, Content: ContentType = undefined, languageID: string = ""): TextDocument | undefined {
  const fsPath = Vscode.FromFs(uri);

  if (languageID === "") {
    languageID = IdentifyDoc(fsPath);
  }

  if (typeof Content === "undefined") {
    const doc = Manager.Documents.get(fsPath);

    //Cached document
    if (doc) return TextDocument.wrap(doc);

    const content = GetDocumentContent(fsPath);

    if (content) {
      return TextDocument.create(fsPath, languageID, 1, content);
    }

    //We have tried all methods of retrieving data so far
    return undefined;
  }
  //Content is provided
  else if (typeof Content === "string") {
    //string provided
    return TextDocument.create(fsPath, languageID, 1, Content);
  }

  //The interface is provided
  return TextDocument.wrap(Content);
}

/**Returns an usable document interaction from the given data.
 * @param uri The url to the document to retrieve.
 * @param Content The possible content of the document or interface to use
 * @param languageID The Language ID associated to the documentated.
 * @returns Returns a textdocument or undefined if something went wrong
 */
export function GetDocumentAsync(uri: string, Content: ContentType = undefined, languageID: string = ""): Promise<TextDocument | undefined> {
  return new Promise<TextDocument | undefined>((resolve, reject) => {
    try {
      resolve(GetDocument(uri, Content, languageID));
    } catch (err) {
      reject(err);
    }
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
export function ForEachDocument(uris: string[], callback: (doc: TextDocument) => void, reporter?: ProgressBar): Promise<string[]> {
  if (reporter) {
    reporter.addMaximum(uris.length);
  }

  return QueueProcessor.forEach(uris, (element) => {
    //Get document
    const doc = GetDocument(element);

    try {
      //If we have a document invoke the requests action
      if (doc) callback(doc);
    } catch (error) {
      HandleError(error, element);
    }

    if (reporter) {
      reporter.addValue();
      reporter.sendProgress();
    }
  });
}

/**
 *
 * @param uri
 * @returns
 */
export function GetDocumentContent(uri: string): string | undefined {
  //Reading file
  const path = Fs.FromVscode(uri);

  if (fs.existsSync(path)) {
    let content: string | undefined;
    try {
      content = fs.readFileSync(path, "utf8");
    } catch (error) {
      HandleError(error, uri);
    }

    return content;
  }

  return undefined;
}
