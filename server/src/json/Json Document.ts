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
import { TextDocument } from "vscode-languageserver-textdocument";
import * as Code from "../code/include";

export class JsonDocument {
  private doc: TextDocument;
  private object: any | undefined;

  constructor(doc: TextDocument) {
    this.object = undefined;
    this.doc = doc;
  }

  public CastTo<T>(): T | undefined | null {
    let object = this.GetObject();

    return <T>object;
  }

  public CastToError<T>(): { value: T | undefined | null; error: any } {
    let object = this.CastToError();

    if (object.error) {
      return { value: undefined, error: object.error };
    }

    let value = object.value;

    return { value: <T>value, error: undefined };
  }

  public GetObject(): any | undefined | null {
    if (this.object === undefined) {
      try {
        let Text = this.doc.getText();
        Text = stripJSONComments(Text);
        let object = JSON.parse(Text);

        this.object = object;
      } catch (error) {
        console.log(error);
        //InvalidJson(this.doc, error);
      }

      //ValidJson(this.doc);
    }

    return this.object;
  }

  public GetObjectError(): { value: any | undefined | null; error: any } {
    let err: any = null;

    if (this.object === undefined) {
      try {
        let Text = this.doc.getText();
        Text = stripJSONComments(Text);
        let object = JSON.parse(Text);

        this.object = object;
      } catch (error) {
        err = error;
        console.log(error);
        //InvalidJson(this.doc, error);
      }

      //ValidJson(this.doc);
    }

    return { value: this.object, error: err };
  }

  public GetRange(Name: string, Value: string): Range | undefined {
    let RegX = new RegExp('"' + Name + '"s*:s*"' + Value + '"', "m");

    return FindReg(this.doc, RegX);
  }

  public GetRangeOfObject(Name: string): Range | undefined {
    let RegX = new RegExp('"' + Name + '"s*:', "m");

    return FindReg(this.doc, RegX);
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

function FindReg(doc: TextDocument, search: RegExp): Range | undefined {
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

export namespace JsonDocument {
  export function GetDocument(uri: string): JsonDocument {
    let temp = Code.GetDocument(uri);

    return new JsonDocument(temp);
  }
}
