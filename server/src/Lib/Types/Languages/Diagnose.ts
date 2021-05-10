import { Manager } from "../../Manager/include";
import { DiagnosticsBuilder } from "../../Diagnostics/Builder";
import { getLine } from "../../Code/include";
import { TextDocument } from "../Document/TextDocument";

/**
 *
 * @param doc
 * @returns
 */
export function provideLanguageDiagnostics(doc: TextDocument) {
  var conf = doc.getConfiguration();
  var set = conf.settings;

  if (!set.Diagnostics.Enable) return;
  if (!set.Diagnostics.Lang) return;

  let builder = new DiagnosticsBuilder(doc);
  let Keys = new Array<string>(doc.lineCount);

  for (let I = 0; I < doc.lineCount; I++) {
    let line = getLine(doc, I).trim();
    Diagnoseline(line, I, Keys, builder);
  }

  builder.SendDiagnostics();
}

/**
 *
 * @param line
 * @param index
 * @param Keys
 * @param builder
 * @returns
 */
export function Diagnoseline(line: string, index: number, Keys: string[], builder: DiagnosticsBuilder): void {
  let CommentIndex = line.indexOf("#");
  if (CommentIndex >= 0) {
    if (line.substring(CommentIndex, CommentIndex + 2) !== "##") {
      builder.AddAt("A comment is always ##", index, CommentIndex, CommentIndex + 1);
    }

    if (CommentIndex > 0) {
      if (line.charAt(CommentIndex - 1) !== "\t") {
        builder.AddAt("Before a comment but be a tab", index, CommentIndex - 1, CommentIndex);
      }
    }

    line = line.substring(0, CommentIndex).trim();
  }

  if (line === "" || line === "\r" || line === "\r\n" || line == "") {
    if (CommentIndex > 0) {
      builder.AddAt("A line cannot be with an identented comment", index, 0, CommentIndex);
    }

    return;
  }

  let Index = line.indexOf("=");

  if (Index < 0) {
    builder.AddAt("A translation item needs a '=' to seperate key and value", index, 0, line.length);
  } else {
    const Key = line.substring(0, Index);
    const KeyIndex = Keys.indexOf(Key);

    if (KeyIndex >= 0 && KeyIndex != index) {
      builder.AddAt("Duplicate key found at: " + KeyIndex, index, 0, Key.length);
      builder.AddAt("Duplicate key found at: " + index, KeyIndex, 0, Key.length);
    }

    Keys[index] = Key;
  }

  if (Index >= line.length) {
    builder.AddAt("A value must be atleast lenght of 1 or more", index, 0, line.length);
  }
}
