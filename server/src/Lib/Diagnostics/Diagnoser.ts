import { Diagnoser, DiagnoserContext, DiagnosticsBuilderContent, DiagnosticSeverity, InternalDiagnosticsBuilder } from "bc-minecraft-bedrock-diagnoser";
import { JsonPath, Position, TextDocument } from "bc-minecraft-bedrock-project";
import { MCIgnore, MCProject } from "bc-minecraft-project";
import { Diagnostic } from "vscode-languageserver";
import { Database, Glob } from "../include";
import { Manager } from "../Manager/Manager";
import * as vstd from "vscode-languageserver-textdocument";
import { Console } from "../Console/Console";
import { Range } from "../Code/Range";
import * as vscode from "vscode-languageserver";
import { GetDocument } from "../Types/Document/include";
import { Character } from "../Code/Character";

/**Creates a new bedrock diagnoser
 * @returns A diagnoser*/
export function CreateDiagnoser(): Diagnoser {
  //create diagnoser
  const out = new Diagnoser(CreateContext());

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

  done(): void {
    Manager.Diagnostic.SendDiagnostics(this.doc, this.Items);
  }

  Add(position: string | number | Position, message: string, severity: DiagnosticSeverity, code: string | number): void {
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

function GetRange(position: JsonPath | number | Position, doc: vstd.TextDocument): Range {
  if (typeof position === "string") {
    const index = position.lastIndexOf("/");
    const length = index > -1 ? position.length - index : position.length;

    position = JsonPath.resolve(doc, position);

    const s = doc.positionAt(position);
    return {
      start: s,
      end: Position.create(s.line, s.character + length),
    };
  }

  let Start: Position;
  let End: Position | undefined = undefined;

  if (Position.is(position)) {
    Start = position;
    position = doc.offsetAt(position);
  } else {
    Start = doc.positionAt(position);
  }

  const text = doc.getText();

  for (let I = position + 1; I < text.length; I++) {
    const c = text[I];

    if (Character.IsLetter(c) || Character.IsNumber(c)) {
      continue;
    }

    const value = c.charCodeAt(0);

    if (value === Character.Character_dash || value === Character.Character_underscore) {
      continue;
    }

    End = doc.positionAt(I);
    break;
  }

  if (!End) {
    End = { character: Start.character + 1, line: Start.line };
  }

  return { start: Start, end: End };
}
