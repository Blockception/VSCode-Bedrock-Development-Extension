import { TextDocument, Range, CodeActionContext, CancellationToken, Command, CodeAction, languages } from "vscode";
import * as vscode from "vscode";
import { ProvideCodeActionsSignature, CodeActionParams, CodeActionRequest, Diagnostic, DiagnosticRelatedInformation, DiagnosticSeverity } from "vscode-languageclient";
import { Manager } from "../Manager/Manager";

/*export function provideCodeActions(
  document: TextDocument,
  range: Range,
  context: CodeActionContext,
  token: CancellationToken,
  next: ProvideCodeActionsSignature
): Promise<(Command | CodeAction)[]> {
  let diags = languages.getDiagnostics(document.uri);

  context.diagnostics;

  const params: CodeActionParams = {
    context: {
      diagnostics: Combine(context.diagnostics, diags),
    },
  };

  return Manager.Client.sendRequest(CodeActionRequest.type, params, undefined);
}

function Combine(diags1: vscode.Diagnostic[], diags2: Diagnostic[]): Diagnostic[] {
  let out: Diagnostic[] = [];

  out.push(...diags1.map<Diagnostic>(ConvertDiagnostic));

  out.push(...diags2);

  return out;
}

function ConvertDiagnostic(d: vscode.Diagnostic): Diagnostic {
  if (Diagnostic.is(d)) return d;

  let out: Diagnostic = {
    message: d.message,
    range: d.range,
  };

  if (typeof d.code === "object") {
    out.code = d.code.value;
    out.codeDescription = { href: d.code.target.toString() };
  } else {
    out.code = d.code;
  }

  out.relatedInformation = d.relatedInformation.map(ConvertRelated);
  out.severity = ConvertSeverity(d.severity);
  out.source = d.source;
  out.tags = d.tags;

  return out;
}

function ConvertRelated(item: vscode.DiagnosticRelatedInformation): DiagnosticRelatedInformation {
  return {
    location: {
      range: item.location.range,
      uri: encodeURI(item.location.uri.toString()),
    },
    message: item.message,
  };
}

function ConvertSeverity(item: vscode.DiagnosticSeverity): DiagnosticSeverity {
  switch (item) {
    case vscode.DiagnosticSeverity.Error:
      return DiagnosticSeverity.Error;
    case vscode.DiagnosticSeverity.Hint:
      return DiagnosticSeverity.Hint;
    case vscode.DiagnosticSeverity.Information:
      return DiagnosticSeverity.Information;
    case vscode.DiagnosticSeverity.Warning:
      return DiagnosticSeverity.Warning;
  }
}
*/
