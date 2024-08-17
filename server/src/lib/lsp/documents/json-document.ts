import { Range } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { ExtensionContext } from "../extension";
import { TextDocument, WrappedTextDocument } from "./text-document";

import * as JSONC from "comment-json";
import * as vscode from "vscode-languageserver-textdocument";

/** A class that help */
export class JsonDocument extends WrappedTextDocument {
  /**
   *
   */
  private object: any | undefined;

  /**
   *
   * @param doc
   */
  constructor(document: vscode.TextDocument, extension: ExtensionContext) {
    super(document, extension);
    this.object = undefined;
  }

  /**
   * Retrieves the json object from the given contents. if failed a null or undefined is returned
   * @returns The object as T or any
   */
  public getObject<T = any>(): T | undefined | null {
    if (this.object === undefined) {
      try {
        const text = this.getText();

        let object;
        if (text !== "") {
          object = JSONC.parse(text, undefined, true);
        }

        this.object = object as T;
        //ValidJson(this.doc);
      } catch (error) {
        this.extension().logger.recordError(error, this._document);
      }
    }

    return this.object;
  }

  /**
   * Retrieves the json object from the given contents. if failed a the error is returned
   * @returns The object as T or any
   */
  public getObjectError(): { value: any | undefined | null; error: any } {
    const err: any = null;

    if (this.object === undefined) {
      try {
        const text = this.getText();
        const object = JSONC.parse(text);
        this.object = object;

        //ValidJson(this.doc);
      } catch (error) {
        this.extension().logger.recordError(error, this._document);
      }
    }

    return { value: this.object, error: err };
  }

  /**
   * Tries to find the range of the given text.
   * @param name The name of the property to find,
   * @param value The value of the property to find
   */
  public getRange(name: string, value: string): Range | undefined {
    const regx = new RegExp(`"${name}"s*:s*"${value}'"`, "m");

    return findRangeRegX(this, regx);
  }

  /**
   * Tries to find the rangeOf the given value in the text
   * @param value The value to look for
   * @returns
   */
  public rangeOf(value: string): Range | undefined {
    const text = this.getText();
    const index = text.indexOf(value);
    if (index < 0) return undefined;

    return Range.create(this.positionAt(index), this.positionAt(index + value.length));
  }

  /**
   * Tries to find the range of the given property
   * @param Name The name of the property to find
   */
  public getRangeOfObject(Name: string): Range | undefined {
    const regx = new RegExp('"' + Name + '"s*:', "m");

    return findRangeRegX(this, regx);
  }

  /**
   *
   * @param Name
   * @returns
   */
  public getStartOfObject(Name: string): Position | undefined {
    const regx = new RegExp('"' + Name + '"s*:', "m");

    return findLocationReg(this, regx);
  }

  /**
   *
   * @param value
   * @returns
   */
  public getPositionOf(value: string): Position | undefined {
    const text = this.getText();
    const index = text.indexOf(value);
    if (index >= 0) return this.positionAt(index);

    return undefined;
  }
}

/**
 * Searches the document with a given index and returns the index of that match.
 * @param doc The document to search through
 * @param search The regex to search for
 */
function findRangeRegX(doc: TextDocument, search: RegExp): Range | undefined {
  const text = doc.getText();
  const matches = text.match(search);

  if (matches) {
    let index = 0;

    if (matches.index) index = matches.index;

    const startP = doc.positionAt(index);
    const endP = doc.positionAt(index + matches.length);

    return Range.create(startP, endP);
  }

  return undefined;
}

/**
 * Searches the document with a given index and returns the index of that match.
 * @param doc The document to search through
 * @param search The regex to search for
 */
function findLocationReg(doc: TextDocument, search: RegExp): Position | undefined {
  const text = doc.getText();
  const matches = text.match(search);

  if (matches) {
    let index = 0;
    if (matches.index) index = matches.index;

    return doc.positionAt(index);
  }

  return undefined;
}
