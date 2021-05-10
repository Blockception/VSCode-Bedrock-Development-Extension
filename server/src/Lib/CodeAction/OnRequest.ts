import { CodeAction, CodeActionParams, Command, Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "./Builder";
import { TagCodeAction } from "./Types/Tag";

export async function OnCodeActionAsync(params: CodeActionParams): Promise<(Command | CodeAction)[] | undefined | null> {
  return new Promise<(Command | CodeAction)[] | undefined | null>((resolve, reject) => {
    resolve(OnCodeAction(params));
  });
}

export async function OnCodeActionResolveAsync(params: CodeAction): Promise<CodeAction> {
  return new Promise<CodeAction>((resolve, reject) => {
    resolve(params);
  });
}

export function OnCodeAction(params: CodeActionParams): (Command | CodeAction)[] {
  let builder = new CodeActionBuilder(params);

  params.context.diagnostics.forEach((d) => FindAction(builder, d));

  return builder.out;
}

function FindAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  var code = diag.code ?? "";

  if (typeof code === "number") {
  } else {
    if (code.startsWith("tag")) TagCodeAction(builder, diag);
  }
}
