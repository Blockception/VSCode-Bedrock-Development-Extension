import {
  Diagnoser,
  DiagnoserContext,
  DiagnosticsBuilderContent,
  DiagnosticSeverity,
  InternalDiagnosticsBuilder,
} from "bc-minecraft-bedrock-diagnoser";
import { MCIgnore, MCProject } from "bc-minecraft-project";
import { Diagnostic } from "vscode-languageserver";
import { Manager } from "../Manager/Manager";
import * as vstd from "vscode-languageserver-textdocument";
import * as vscode from "vscode-languageserver";
import { GetDocument, TextDocument } from "../Types/Document/include";
import { Types } from "bc-minecraft-bedrock-types";
import { Database } from "../Database/include";
import { Glob } from "../Glob/include";
import { Console } from "../Manager/Console";
import path from "path";
import { GetRange } from "../Code/DocumentLocation";

/**Creates a new bedrock diagnoser
 * @returns A diagnoser*/
export function CreateDiagnoser(): Diagnoser {
  //create diagnoser
  const tcontext = CreateContext();
  const out = new Diagnoser(tcontext);

  return out;
}

/**Creates the content for the diagnoser
 * @returns*/
export function CreateContext(): DiagnoserContext {
  //create context
  const context: DiagnoserContext = {
    getCache: getCache,
    getDiagnoser: getDiagnoser,
    getDocument: getDocument,
    getFiles: getFiles,
  };

  return context;
}

/**
 *
 * @returns
 */
function getCache() {
  return Database.ProjectData;
}

/**gets a document diagnoser
 * @param doc The document to make a diagnoser for
 * @param project The project context
 * @returns*/
function getDiagnoser(doc: TextDocument, project: MCProject): InternalDiagnosticsBuilder | undefined {
  if (Glob.IsMatch(doc.uri, project.ignores.patterns)) {
    Console.Info("Skipping diagnostics on document, because its ignored: " + doc.uri);
    return undefined;
  }

  //Check if project disabled diagnostics
  if (project.attributes["diagnostic.enable"] === "false") return undefined;
  if (project.attributes["diagnostic" + path.extname(doc.uri)] === "false") return undefined;

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
  return Glob.GetFiles(["**.*","**/*.*"], ignores.patterns, folder);
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
    //Was diagnostics code disabled
    if (this.project.attributes["diagnostic.disable." + code] === "false") return;

    const Error: Diagnostic = {
      message: message,
      code: code,
      severity: GetSeverity(severity),
      range: GetRange(position, this.doc),
      source: "mc",
    };

    if (typeof code === "number") {
      Error.codeDescription = { href: `https://github.com/Blockception/Minecraft-Error-Codes/blob/main/codes/main.md#${code}` };
    } else {
      Error.codeDescription = { href: `https://github.com/Blockception/Minecraft-Error-Codes/blob/main/${code.replace(/\./gi, "/")}.md` };
    }

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
