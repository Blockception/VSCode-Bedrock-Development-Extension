import {
  DiagnosticsBuilderContent,
  DiagnosticSeverity,
  ManagedDiagnosticsBuilder,
} from "bc-minecraft-bedrock-diagnoser";
import { Diagnostic } from "vscode-languageserver";
import { MCProject } from "bc-minecraft-project";
import { Types } from "bc-minecraft-bedrock-types";
import { GetRange } from "../../util";
import { TextDocument } from "../documents/text-document";

import * as vscode from "vscode-languageserver";

export class InternalDiagnoser implements ManagedDiagnosticsBuilder<TextDocument> {
  public doc: TextDocument;
  public items: Diagnostic[];
  public context: DiagnosticsBuilderContent<TextDocument>;
  public project: MCProject;
  public isDone: boolean;

  /**@inheritdoc*/
  constructor(doc: TextDocument, project: MCProject, context: DiagnosticsBuilderContent<TextDocument>) {
    this.doc = doc;
    this.items = [];

    this.project = project;
    this.context = context;
    this.isDone = false;
  }

  /**@inheritdoc*/
  done(): void {
    this.isDone = true;
  }

  /**@inheritdoc*/
  add(position: Types.DocumentLocation, message: string, severity: DiagnosticSeverity, code: string | number): void {
    //Was diagnostics code disabled
    if (this.project.attributes["diagnostic.disable." + code] === "true") return;

    const Error: Diagnostic = {
      message: message,
      code: code,
      severity: getSeverity(severity),
      range: GetRange(position, this.doc),
      source: "mc",
    };

    if (typeof code === "number") {
      Error.codeDescription = {
        href: `https://github.com/Blockception/Minecraft-Error-Codes/blob/main/codes/main.md#${code}`,
      };
    } else {
      Error.codeDescription = {
        href: `https://github.com/Blockception/Minecraft-Error-Codes/blob/main/${code.replace(/\./gi, "/")}.md`,
      };
    }

    this.items.push(Error);
  }
}

/**
 *
 * @param severity
 * @returns
 */
function getSeverity(severity: DiagnosticSeverity): vscode.DiagnosticSeverity {
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
