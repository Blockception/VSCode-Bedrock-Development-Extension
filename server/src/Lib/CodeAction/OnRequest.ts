import { Attributes } from "./Types/Definition";
import { CodeAction, CodeActionParams, Command, Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "./Builder";
import { GetDocument } from "../Types/Document/Document";

import * as Minecraft from "../Minecraft/CodeAction";
import * as BehaviorPack from "../Minecraft/BehaviorPack/CodeAction";
import * as ResourcePack from "../Minecraft/ResourcePack/CodeAction";
import { FuzzyMatch } from './Fuzzy';

/**
 *
 * @param params
 * @returns
 */
export async function OnCodeActionAsync(params: CodeActionParams): Promise<(Command | CodeAction)[] | undefined | null> {
  return OnCodeAction(params);
}

/**
 *
 * @param params
 * @returns
 */
export async function OnCodeActionResolveAsync(params: CodeAction): Promise<CodeAction> {
return Promise.resolve(params);
}

/**
 *
 * @param params
 * @returns
 */
export function OnCodeAction(params: CodeActionParams): Promise<(Command | CodeAction)[]> {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return Promise.resolve([]);

  const builder = new CodeActionBuilder(params, doc);
  const promises = params.context.diagnostics.map((d) => FindAction(builder, d));
  return Promise.all(promises).then(() => builder.out);
}

/**
 *
 * @param builder
 * @param diag
 */
function FindAction(builder: CodeActionBuilder, diag: Diagnostic): Promise<void> {
  var code = diag.code ?? "";  
  Attributes(builder, diag);

  if (typeof code === "number") return Promise.resolve();

  const index = code.indexOf(".");
  const maincode = index > -1 ? code.slice(0, index) : code;

  switch (maincode) {
    case "behaviorpack":
      BehaviorPack.OnCodeAction(builder, diag);
    case "resourcepack":
      ResourcePack.OnCodeAction(builder, diag);

    case "minecraft":
      Minecraft.OnCodeAction(builder, diag);

    case "mcfunction":
  }

  return FuzzyMatch(builder, diag);
}
