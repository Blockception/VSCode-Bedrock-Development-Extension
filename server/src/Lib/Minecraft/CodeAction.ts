import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../CodeAction/Builder";
import { General } from "./include";

/**
 *
 * @param builder
 * @param diag
 */
export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  let code = diag.code ?? "";

  if (typeof code === "number") return;

  //minecraft.
  const index = code.indexOf(".", 10);
  const subcode = index > -1 ? code.slice(10, index) : code.slice(10);

  switch (subcode) {
    case "fakeentity":
      return General.FakeEntity.OnCodeAction(builder, diag);

    case "name": 
      return General.Names.OnCodeAction(builder, diag);

    case "objective":
      return General.Objectives.OnCodeAction(builder, diag);

    case "tag":
      return General.Tag.OnCodeAction(builder, diag);

    case "tickingarea":
      return General.Tickingarea.OnCodeAction(builder, diag);
  }
}
