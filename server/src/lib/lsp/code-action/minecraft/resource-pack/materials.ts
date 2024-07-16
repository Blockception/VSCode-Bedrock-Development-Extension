import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";


export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {

  }
}
