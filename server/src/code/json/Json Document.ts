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
import { Range } from "vscode-languageserver";
import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { Console } from "../../console/Console";
import { Manager } from "../../manager/include";
import * as Code from "../include";

export class JsonDocument {
  public doc: TextDocument;
  private object: any | undefined;

  constructor(doc: TextDocument) {
    this.object = undefined;
    this.doc = doc;
  }

  /**Casts the contents of the document to the specified interface*/
  public CastTo<T>(): T | undefined | null {
    let object = this.GetObject();

    return <T>object;
  }

  /**Casts the contents of the document to the specified interface, if any errors is occured during that process. that error is returned */
  public CastToError<T>(): { value: T | undefined | null; error: any } {
    let object = this.CastToError();

    if (object.error) {
      return { value: undefined, error: object.error };
    }

    let value = object.value;

    return { value: <T>value, error: undefined };
  }

  /**Retrieves the json object from the given contents. if failed a null or undefined is returned*/
  public GetObject(): any | undefined | null {
    if (this.object === undefined) {
      try {
        let Text = this.doc.getText();
        Text = stripJSONComments(Text);

        let object;
        if (Text !== "") {
          object = JSON.parse(Text);
        }

        this.object = object;
        //ValidJson(this.doc);
      } catch (error) {
        Console.Error("Invalid Json: " + this.doc.uri + "\n + " + error);
        //InvalidJson(this.doc, error);
      }
    }

    return this.object;
  }

  /**Retrieves the json object from the given contents. if failed a the error is returned*/
  public GetObjectError(): { value: any | undefined | null; error: any } {
    let err: any = null;

    if (this.object === undefined) {
      try {
        let Text = this.doc.getText();
        Text = stripJSONComments(Text);
        let object = JSON.parse(Text);
        this.object = object;

        //ValidJson(this.doc);
      } catch (error) {
        Console.Error("Invalid Json: " + this.doc.uri + "\n + " + error);
        //InvalidJson(this.doc, error);
      }
    }

    return { value: this.object, error: err };
  }

  /**
   * Tries to find the range of the given text.
   * @param Name The name of the property to find,
   * @param Value The value of the property to find
   */
  public GetRange(Name: string, Value: string): Range | undefined {
    let RegX = new RegExp('"' + Name + '"s*:s*"' + Value + '"', "m");

    return FindRangeReg(this.doc, RegX);
  }

  /**
   * Tries to find the range of the given property
   * @param Name The name of the property to find
   */
  public GetRangeOfObject(Name: string): Range | undefined {
    let RegX = new RegExp('"' + Name + '"s*:', "m");

    return FindRangeReg(this.doc, RegX);
  }

  public GetStartOfObject(Name: string): Position | undefined {
    let RegX = new RegExp('"' + Name + '"s*:', "m");

    return FindLocationReg(this.doc, RegX);
  }

  public GetPositionOf(value: string): Position | undefined {
    let text = this.doc.getText();
    let index = text.indexOf(value);

    if (index >= 0) return this.doc.positionAt(index);

    return undefined;
  }
}

/**
 * Removes any json comments from the given json text
 * @param data json in text form
 */
function stripJSONComments(data: string): string {
  var re = new RegExp("//(.*)", "g");
  return data.replace(re, "");
}

/**
 * Searches the document with a given index and returns the index of that match.
 * @param doc
 * @param search
 */
function FindRangeReg(doc: TextDocument, search: RegExp): Range | undefined {
  let Text = doc.getText();
  let Matches = Text.match(search);

  if (Matches) {
    let index = 0;

    if (Matches.index) index = Matches.index;

    let startP = doc.positionAt(index);
    let endP = doc.positionAt(index + Matches.length);

    return Range.create(startP, endP);
  }

  return undefined;
}

/**
 * Searches the document with a given index and returns the index of that match.
 * @param doc
 * @param search
 */
function FindLocationReg(doc: TextDocument, search: RegExp): Position | undefined {
  let Text = doc.getText();
  let Matches = Text.match(search);

  if (Matches) {
    let index = 0;

    if (Matches.index) index = Matches.index;

    return doc.positionAt(index);
  }

  return undefined;
}

export namespace JsonDocument {
  export function GetDocument(uri: string): JsonDocument {
    let temp = Code.GetDocument(uri);

    return new JsonDocument(temp);
  }
}
