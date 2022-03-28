import { CodeAction, CodeActionParams, Command, Diagnostic } from "vscode-languageserver";
import * as Minecraft from "../Minecraft/CodeAction";
import { CodeActionBuilder } from "./Builder";
import { Attributes } from "./Types/Definition";

import * as BehaviorPack from '../Minecraft/BehaviorPack/CodeAction';
import * as ResourcePack from '../Minecraft/ResourcePack/CodeAction';
import { GetDocument } from '../Types/Document/Document';

/**
 *
 * @param params
 * @returns
 */
export async function OnCodeActionAsync(params: CodeActionParams): Promise<(Command | CodeAction)[] | undefined | null> {
  return new Promise<(Command | CodeAction)[] | undefined | null>((resolve, reject) => {
    resolve(OnCodeAction(params));
  });
}

/**
 *
 * @param params
 * @returns
 */
export async function OnCodeActionResolveAsync(params: CodeAction): Promise<CodeAction> {
  return new Promise<CodeAction>((resolve, reject) => {
    resolve(params);
  });
}

/**
 *
 * @param params
 * @returns
 */
export function OnCodeAction(params: CodeActionParams): (Command | CodeAction)[] {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return [];

  const builder = new CodeActionBuilder(params, doc);
  params.context.diagnostics.forEach((d) => FindAction(builder, d));
  return builder.out;
}

/**
 *
 * @param builder
 * @param diag
 */
function FindAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  var code = diag.code ?? "";

  if (typeof code === "number") {
  } else {
    const index = code.indexOf(".");
    const maincode = index > -1 ? code.slice(0, index) : code;

    switch (maincode) {
      case "behaviorpack":
        BehaviorPack.OnCodeAction(builder, diag);
        return Attributes(builder, diag);

      case "resourcepack":
        ResourcePack.OnCodeAction(builder, diag);
        return Attributes(builder, diag);

      case "minecraft":
        Minecraft.OnCodeAction(builder, diag);
        return Attributes(builder, diag);

      case "mcfunction":
        return Attributes(builder, diag);
    }
  }
}
