import { Attributes } from "./Types/Definition";
import { CodeAction, CodeActionParams, Command, Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "./Builder";
import { Console } from '../Manager';
import { FuzzyMatch } from "./Fuzzy";
import { GetDocument } from "../Types/Document/Document";

import * as Minecraft from "../Minecraft/CodeAction";
import * as BehaviorPack from "../Minecraft/BehaviorPack/CodeAction";
import * as ResourcePack from "../Minecraft/ResourcePack/CodeAction";


/**
 *
 * @param params
 * @returns
 */
export async function OnCodeActionAsync(params: CodeActionParams): Promise<(Command | CodeAction)[] | undefined | null> {
  return Console.request("Code action", OnCodeAction(params));
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
export async function OnCodeAction(params: CodeActionParams): Promise<(Command | CodeAction)[]> {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return Promise.resolve([]);

  const builder = new CodeActionBuilder(params, doc);
  const promises = params.context.diagnostics.map((d) => FindAction(builder, d));
  await Promise.all(promises);
  return builder.out;
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
  const mainCode = index > -1 ? code.slice(0, index) : code;

  switch (mainCode) {
    case "behaviorpack":
      BehaviorPack.OnCodeAction(builder, diag);
      break;

    case "resourcepack":
      ResourcePack.OnCodeAction(builder, diag);
      break;

    case "minecraft":
      Minecraft.OnCodeAction(builder, diag);
      break;

    case "mcfunction":
  }

  return FuzzyMatch(builder, diag);
}
