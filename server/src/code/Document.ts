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
import * as fs from "fs";
import * as fg from "fast-glob";
import { Position, Range, TextDocument } from "vscode-languageserver-textdocument";
import { Manager } from "../manager/Manager";
import { JsonIdentifier, McFunctionIdentifier, McLanguageIdentifier, McOtherIdentifier } from "../Constants";
import { GetFilepath, UniformUrl } from "./Url";
import { fileURLToPath } from "url";

/**
 * Returns an usable document interaction from the given data.
 *
 * @param uri The url to the document to retrieve.
 * @param Content The possible content of the document or interface to use
 * @param languageID The Language ID associated to the documentated.
 */
export function GetDocument(uri: string, Content: string | TextDocument | undefined = undefined, languageID: string = ""): TextDocument {
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
      console.log(JSON.stringify(path));
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
  if (uri.endsWith(".mcfunction")) return McFunctionIdentifier;
  if (uri.endsWith(".lang")) return McLanguageIdentifier;
  if (uri.endsWith(".json")) return JsonIdentifier;

  return McOtherIdentifier;
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

    if (doc) callback(doc);
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

  getText(range?: Range): string {
    return this.doc.getText(range);
  }

  positionAt(offset: number): Position {
    return this.doc.positionAt(offset);
  }

  offsetAt(position: Position): number {
    return this.doc.offsetAt(position);
  }

  constructor(doc: TextDocument) {
    this.doc = doc;
    this.uri = GetFilepath(UniformUrl(doc.uri));
    this.languageId = doc.languageId;
    this.lineCount = doc.lineCount;
    this.version = doc.version;
  }
}
