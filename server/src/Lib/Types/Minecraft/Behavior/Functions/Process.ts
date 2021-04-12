import { TextDocument } from "vscode-languageserver-textdocument";
import { getLine } from "../../../../Code/include";
import { ProcessCommand } from "../../../Commands/Process";
import { Languages } from "../../../../Constants";
import { Database } from "../../../../Database/include";
import { McFunction } from "../../../General/Functions/include";
import { ProvideMcfunctionDiagnostics } from "./Diagnostics";
import { GetComment } from "./Function";

export function Process(document: TextDocument): void {
  Database.Data.DeleteFile(document.uri);

  if (document.languageId !== Languages.McFunctionIdentifier) return;

  ProcessContent(document);
  ProvideMcfunctionDiagnostics(document);
}

function ProcessContent(document: TextDocument): void {
  for (let Index = 0; Index < document.lineCount; Index++) {
    const Line = getLine(document, Index);

    ProcessCommand(Line, { character: 0, line: Index }, document);
  }

  const uri = document.uri;
  let Index = uri.indexOf("\\functions\\");

  if (Index > -1) {
    let Identifier = uri.slice(Index + 11, uri.length);
    Identifier = Identifier.replace(/\\/g, "/");
    Identifier = Identifier.replace(".mcfunction", "");

    if (Identifier.includes(" ")) {
      Identifier = '"' + Identifier + '"';
    }

    let Mcfunction = new McFunction();
    Mcfunction.Identifier = Identifier;
    Mcfunction.Location.uri = uri;

    //Get first comment as documentation
    const FirstLine = getLine(document, 0);
    const Comment = GetComment(FirstLine).trim();

    if (Comment === "") {
      Mcfunction.Documentation.value = "A function without definition, make a comment on the first line to fill this space :D";
    } else {
      Mcfunction.Documentation.value = Comment;
    }

    Database.Data.General.Functions.Set(Mcfunction);
  }
}
