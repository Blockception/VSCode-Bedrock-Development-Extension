import { Attributes } from "./types/Definition";
import { CodeAction, CodeActionParams, Command, Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "./builder";
import { Console } from "../Manager";
import { fuzzyMatch } from "./fuzzy";
import { GetDocument } from "../Types/Document/Document";

import * as Minecraft from "./minecraft/code-actions";
import * as BehaviorPack from "./minecraft/behavior-pack/main";
import * as ResourcePack from "./minecraft/resource-pack/main";

/**
 *
 * @param params
 * @returns
 */
export async function onCodeActionAsync(
  params: CodeActionParams
): Promise<(Command | CodeAction)[] | undefined | null> {
  return Console.request("Code action", onCodeAction(params));
}

/**
 *
 * @param params
 * @returns
 */
export async function onCodeActionResolveAsync(params: CodeAction): Promise<CodeAction> {
  return Promise.resolve(params);
}

/**
 *
 * @param params
 * @returns
 */
export async function onCodeAction(params: CodeActionParams): Promise<(Command | CodeAction)[]> {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return Promise.resolve([]);

  const builder = new CodeActionBuilder(params, doc);
  const promises = params.context.diagnostics.map((d) => findAction(builder, d));
  await Promise.all(promises);
  return builder.out;
}

/**
 *
 * @param builder
 * @param diag
 */
function findAction(builder: CodeActionBuilder, diag: Diagnostic): Promise<void> {
  var code = diag.code ?? "";
  Attributes(builder, diag);

  if (typeof code === "number") return Promise.resolve();

  const index = code.indexOf(".");
  const mainCode = index > -1 ? code.slice(0, index) : code;

  switch (mainCode) {
    case "behaviorpack":
      BehaviorPack.onCodeAction(builder, diag);
      break;

    case "resourcepack":
      ResourcePack.onCodeAction(builder, diag);
      break;

    case "minecraft":
      Minecraft.onCodeAction(builder, diag);
      break;

    case "mcfunction":
  }

  return fuzzyMatch(builder, diag);
}
