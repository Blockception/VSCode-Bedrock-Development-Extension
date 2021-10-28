import * as fs from "fs";
import * as vscode from "vscode-languageserver-textdocument";
import { Manager } from "../../Manager/Manager";
import { Languages } from "../../Constants";
import { TextDocument } from "./TextDocument";
import { MCAttributes, MCDefinition, MCIgnore } from "bc-minecraft-project";
import { Glob } from "../../Glob/Glob";
import { HandleError } from "../../Code/Error";
import { Fs, Vscode } from "../../Code/Url";
import { ProgressBar } from "../Progress/ProgressBar";
import { QueueBatchProcessor } from "@daanv2/queue-processor";
import { Console } from "../../Manager/Console";

/**Returns an usable document interaction from the given data.
 * @param uri The url to the document to retrieve.
 * @param Content The possible content of the document or interface to use
 * @param languageID The Language ID associated to the documentated.
 * @returns Returns a textdocument or undefined if something went wrong
 */
export function GetDocument(
  uri: string,
  Content: string | vscode.TextDocument | undefined = undefined,
  languageID: string = ""
): TextDocument | undefined {
  const Old = uri;
  uri = Vscode.FromFs(uri);

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
    return undefined;
  }
  //Content is provided
  else if (typeof Content === "string") {
    //string provided
    return TextDocument.create(uri, languageID, 1, Content);
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
export function GetDocumnetAsync(
  uri: string,
  Content: string | vscode.TextDocument | undefined = undefined,
  languageID: string = ""
): Promise<TextDocument | undefined> {
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

  const processor = new QueueBatchProcessor(uris, (element) => {
    const doc = GetDocument(element);

    try {
      if (doc) callback(doc);
    } catch (error) {
      HandleError(error, element);
    }

    if (reporter) {
      reporter.addValue();
      reporter.sendProgress();
    }
  });

  const temp: { _batchsize: number } = <{ _batchsize: number }>(<unknown>processor);
  Console.Info(`Processing ${uris.length} files with batchsize: ${temp._batchsize}`);

  return processor;
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
