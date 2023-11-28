import { Range } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import * as JSONC from "comment-json";
import * as Code from "./Document";
import { TextDocument } from "./TextDocument";
import { HandleError } from "../../Code/Error";

/**
 *
 */
export class JsonDocument {
  /**
   *
   */
  public doc: TextDocument;

  /**
   *
   */
  private object: any | undefined;

  /**
   *
   * @param doc
   */
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
    let object = this.GetObjectError();

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

        let object;
        if (Text !== "") {
          object = JSONC.parse(Text, undefined, true);
        }

        this.object = object;
        //ValidJson(this.doc);
      } catch (error) {
        HandleError(error, this.doc);
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
        let object = JSONC.parse(Text);
        this.object = object;

        //ValidJson(this.doc);
      } catch (error) {
        HandleError(error, this.doc);
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
   *
   * @param Value
   * @returns
   */
  public RangeOf(Value: string): Range | undefined {
    let Text = this.doc.getText();

    let index = Text.indexOf(Value);

    if (index < 0) return undefined;

    return Range.create(this.doc.positionAt(index), this.doc.positionAt(index + Value.length));
  }

  /**
   * Tries to find the range of the given property
   * @param Name The name of the property to find
   */
  public GetRangeOfObject(Name: string): Range | undefined {
    let RegX = new RegExp('"' + Name + '"s*:', "m");

    return FindRangeReg(this.doc, RegX);
  }

  /**
   *
   * @param Name
   * @returns
   */
  public GetStartOfObject(Name: string): Position | undefined {
    let RegX = new RegExp('"' + Name + '"s*:', "m");

    return FindLocationReg(this.doc, RegX);
  }

  /**
   *
   * @param value
   * @returns
   */
  public GetPositionOf(value: string): Position | undefined {
    let text = this.doc.getText();
    let index = text.indexOf(value);

    if (index >= 0) return this.doc.positionAt(index);

    return undefined;
  }
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

/**
 *
 */
export namespace JsonDocument {
  /**
   *
   * @param uri
   * @returns
   */
  export function GetDocument(uri: string): JsonDocument | undefined {
    const temp = Code.GetDocument(uri);

    if (temp) return new JsonDocument(temp);

    return undefined;
  }
}
