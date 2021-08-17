import { Diagnoser, DiagnoserContext, DiagnosticsBuilderContent, DiagnosticSeverity, InternalDiagnosticsBuilder } from "bc-minecraft-bedrock-diagnoser";
import { MCIgnore, MCProject } from "bc-minecraft-project";
import { Diagnostic } from "vscode-languageserver";
import { Database, Glob } from "../include";
import { Manager } from "../Manager/Manager";
import * as vstd from "vscode-languageserver-textdocument";
import { Console } from "../Console/Console";
import { Range } from "../Code/Range";
import * as vscode from "vscode-languageserver";
import { GetDocument, TextDocument } from "../Types/Document/include";
import { Character } from "../Code/Character";
import { Types } from "bc-minecraft-bedrock-types";

/**Creates a new bedrock diagnoser
 * @returns A diagnoser*/
export function CreateDiagnoser(): Diagnoser {
  //create diagnoser
  const context = CreateContext();
  const out = new Diagnoser(context);

  return out;
}

/**Creates the content for the diagnoser
 * @returns*/
function CreateContext(): DiagnoserContext {
  //create context
  const context: DiagnoserContext = {
    cache: Database.Database.ProjectData,
    getDiagnoser: getDiagnoser,
    getDocument: getDocument,
    getFiles: getFiles,
  };

  return context;
}

/**gets a document diagnoser
 * @param doc The document to make a diagnoser for
 * @param project The project context
 * @returns*/
function getDiagnoser(doc: TextDocument, project: MCProject): InternalDiagnosticsBuilder | undefined {
  if (Glob.Glob.IsMatch(doc.uri, project.ignores.patterns)) {
    Console.Info("Skipping diagnostics on document, because its ignored: " + doc.uri);
    return undefined;
  }

  return new _InternalDiagnoser(<vstd.TextDocument>doc, project, CreateContext());
}

/**
 *
 * @param uri
 * @returns
 */
function getDocument(uri: string): TextDocument | undefined {
  return GetDocument(uri);
}

/**
 *
 * @param folder
 * @param ignores
 * @returns
 */
function getFiles(folder: string, ignores: MCIgnore): string[] {
  return Glob.Glob.GetFiles("**.*", ignores.patterns, folder);
}

/**Make sure the given text document is from <vstd.TextDocument>*/
class _InternalDiagnoser implements InternalDiagnosticsBuilder {
  public doc: vstd.TextDocument;
  public Items: Diagnostic[];
  public context: DiagnosticsBuilderContent;
  public project: MCProject;

  constructor(doc: vstd.TextDocument, project: MCProject, context: DiagnosticsBuilderContent) {
    this.doc = doc;
    this.Items = [];

    this.project = project;
    this.context = context;
  }

  /**A signal from the diagnoser API that this diagnoser is done*/
  done(): void {
    Manager.Diagnostic.SendDiagnostics(this.doc, this.Items);
  }

  /**
   *
   * @param position
   * @param message
   * @param severity
   * @param code
   */
  Add(position: Types.DocumentLocation, message: string, severity: DiagnosticSeverity, code: string | number): void {
    const Error: Diagnostic = {
      message: message,
      code: code,
      severity: GetSeverity(severity),
      range: GetRange(position, this.doc),
      source: "bcmc",
    };

    this.Items.push(Error);
  }
}

/**
 *
 * @param severity
 * @returns
 */
function GetSeverity(severity: DiagnosticSeverity): vscode.DiagnosticSeverity {
  switch (severity) {
    case DiagnosticSeverity.info:
      return vscode.DiagnosticSeverity.Information;

    case DiagnosticSeverity.none:
      return vscode.DiagnosticSeverity.Hint;

    case DiagnosticSeverity.warning:
      return vscode.DiagnosticSeverity.Warning;

    case DiagnosticSeverity.error:
    default:
      return vscode.DiagnosticSeverity.Error;
  }
}

/**
 *
 * @param position
 * @param doc
 * @returns
 */
function GetRange(position: Types.DocumentLocation, doc: vstd.TextDocument): Range {
  if (Types.JsonPath.is(position)) {
    return resolveJsonPath(position, doc);
  }

  let Start: Types.Position;
  let End: Types.Position | undefined = undefined;

  //If document location is already a position, then grab the offset to start at
  if (Types.Position.is(position)) {
    Start = position;
    position = doc.offsetAt(position);
    //If document location is already an offset, then grab the start position
  } else {
    Start = doc.positionAt(position);
  }

  const text = doc.getText();

  for (let I = position + 1; I < text.length; I++) {
    const c = text.charCodeAt(I);

    //If character is a letter or number then keep going until we find something else
    if (Character.IsLetterCode(c) || Character.IsNumberCode(c)) continue;

    //Dashes and underscore are to be respected
    if (c === Character.Character_dash || c === Character.Character_underscore) continue;

    //Something has been found that is not considered a "word"
    End = doc.positionAt(I);
    break;
  }

  //If end is still undefined then make atleast one character big
  if (!End) {
    End = { character: Start.character + 1, line: Start.line };
  }

  return { start: Start, end: End };
}

function resolveJsonPath(position: string, doc: vstd.TextDocument): Range {
  const index = position.lastIndexOf("/");
  const length = index > -1 ? position.length - index : position.length;

  const offset = Types.JsonPath.resolve(doc, position);

  const start = doc.positionAt(offset);
  const end = doc.positionAt(offset + position.length);

  return { start: start, end: end };
}
