import { Diagnostic, PublishDiagnosticsParams } from "vscode-languageserver";
import { Manager } from "../../Manager/Manager";

export class DiagnosticCollector {
  private Data: Map<string, Diagnostic[]>;

  constructor() {
    this.Data = new Map<string, Diagnostic[]>();
  }

  public SetErrors(uri: string, errors: Diagnostic[]): void {
    this.Data.set(uri, errors);
    this.sendData(uri, errors);
  }

  public GetErrors(uri: string): Diagnostic[] | undefined {
    return this.Data.get(uri);
  }

  public RemoveFile(uri: string): void {
    this.Data.delete(uri);
    this.sendData(uri, []);
  }

  private sendData(uri: string, errors: Diagnostic[]): void {
    let Out: PublishDiagnosticsParams = {
      uri: uri,
      diagnostics: errors,
    };

    Manager.Connection.sendDiagnostics(Out);
  }
}
