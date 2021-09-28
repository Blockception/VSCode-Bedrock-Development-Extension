import { CodeAction, CodeActionParams, Command, Diagnostic } from "vscode-languageserver";
import { Minecraft } from "../include";
import { BehaviorPack, ResourcePack } from "../Minecraft/include";
import { CodeActionBuilder } from "./Builder";

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
  const builder = new CodeActionBuilder(params);
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
        return BehaviorPack.OnCodeAction(builder, diag);

      case "resourcepack":
        return ResourcePack.OnCodeAction(builder, diag);

      case "minecraft":
        return Minecraft.OnCodeAction(builder, diag);
    }
  }
}
