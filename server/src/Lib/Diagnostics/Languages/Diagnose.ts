import { DiagnosticsBuilder } from "../Builder";
import { TextDocument } from "../../Types/Document/TextDocument";

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
    let line = doc.getLine(I).trim();
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
  //Find comment on line
  const CommentIndex = line.indexOf("#");

  //If comment has been found
  if (CommentIndex >= 0) {
    //Ensuring that comment has started right '##'
    if (line.substring(CommentIndex, CommentIndex + 2) !== "##") {
      builder.AddAt("A comment is always ##", index, CommentIndex, CommentIndex + 1).code = "comment.invalid";
    }

    //Check if the comment doesn't start at the start of the line
    if (CommentIndex > 0) {
      //Comments need to be predicated with a tab if they do not start at the beginning of the line
      if (line.charAt(CommentIndex - 1) !== "\t") {
        builder.AddAt("Before a comment but be a tab", index, CommentIndex - 1, CommentIndex).code = "line.format";
      }
    }

    //Remove comment;
    line = line.substring(0, CommentIndex).trim();
  }

  //If line is empty
  if (line === "" || line === "\r" || line === "\r\n" || line == "") {
    //If the line was an identend comment, it will leave an empty line
    if (CommentIndex > 0) {
      builder.AddAt("A line cannot be with an identented comment", index, 0, CommentIndex).code = "line.format";
    }

    return;
  }

  //Find end of key
  const Index = line.indexOf("=");

  //If no key definition has been found, it means an invalid line has been given
  if (Index < 0) {
    builder.AddAt("A translation item needs a '=' to seperate key and value", index, 0, line.length).code = "line.invalid";
  } else {
    const Key = line.substring(0, Index);
    const KeyIndex = Keys.indexOf(Key.toLowerCase());

    //If the key is found in the existing list of keys, then produce an error
    if (KeyIndex >= 0 && KeyIndex != index) {
      builder.AddAt("Duplicate key found at: " + KeyIndex, index, 0, Key.length).code = "line.duplicate";
      builder.AddAt("Duplicate key found at: " + index, KeyIndex, 0, Key.length).code = "line.duplicate";
    }

    Keys[index] = Key.toLowerCase();
  }

  //The value needs to be something
  if (Index >= line.length) {
    builder.AddAt("A value must be atleast lenght of 1 or more", index, 0, line.length).code = "line.invalid";
  }
}
