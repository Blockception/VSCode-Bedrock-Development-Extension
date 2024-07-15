import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../code-action/builder";


export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {

  }
}
