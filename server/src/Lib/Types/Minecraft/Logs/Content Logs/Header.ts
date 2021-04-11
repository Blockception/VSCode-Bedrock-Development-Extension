import { Diagnostic, DiagnosticSeverity, Range } from "vscode-languageserver";
import { EmptyTypes } from "../../../General/include";

export interface ContentLogHeader {
  Time: string;
  Category: string;
  Severity: string;
  Message: string;
}

export function GetHeader(line: string): ContentLogHeader | undefined {
  let Match = line.match(/(\d{2}:\d{2}:\d{2})\[(\w+)\]\[(\w+)\]/);

  if (Match)
    if (Match.length >= 4) {
      let Out: ContentLogHeader = {
        Time: Match[1],
        Category: Match[2],
        Message: "",
        Severity: Match[3],
      };

      let Index = (Match.index ?? 0) + Match[0].length;
      Out.Message = line.slice(Index, line.length);

      return Out;
    }

  return undefined;
}

export function GetSeverity(header: ContentLogHeader): DiagnosticSeverity {
  switch (header.Severity.toLowerCase()) {
    case "warning":
      return DiagnosticSeverity.Warning;

    case "error":
      return DiagnosticSeverity.Error;
  }

  return DiagnosticSeverity.Error;
}

export function GetRange(Header: ContentLogHeader): Range {
  let Out = EmptyTypes.EmptyRange();
  let LineSpec = Header.Message.match(/line (\d+)/);

  if (LineSpec && LineSpec.length >= 2) {
    let Index = Number.parseInt(LineSpec[1]);
    Out.start.line = Index;
    Out.end.line = Index;
  }

  return Out;
}

export function CreateDiagnostics(Header: ContentLogHeader): Diagnostic {
  return {
    message: Header.Message,
    range: GetRange(Header),
    severity: GetSeverity(Header),
  };
}
