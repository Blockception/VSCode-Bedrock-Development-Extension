import { Languages } from "@blockception/shared";
import { PackType } from "bc-minecraft-bedrock-project";
import { CompletionItemKind } from "vscode-languageserver";
import { getPreviousWord, IsMolang } from "../../../../minecraft/molang/functions";
import { Context } from "../../../context/context";
import { CompletionContext } from "../../context";

import * as Geometry from "./geometry";
import * as Material from "./materials";
import * as Math from "./math";
import * as Query from "./query";
import * as Temps from "./temps";
import * as Texture from "./texture";
import * as Variables from "./variables";

import * as BP_Animation_Controllers from "../behavior-pack/animation-controllers";
import * as BP_Animations from "../behavior-pack/animations";
import * as RP_Animations_Controllers from "../resource-pack/animation-controllers";
import * as RP_Animations from "../resource-pack/animations";
import * as RP_Render_Controllers from "../resource-pack/render-controllers";

export function provideDocCompletion(context: Context<CompletionContext>): void {
  const { document, position } = context;
  const line = document.getLine(position.line);

  return provideCompletion(context, line, context.cursor);
}

/**
 *
 * @param line
 * @param cursor
 * @param doc
 * @param receiver
 * @returns
 */
export function provideCompletion(context: Context<CompletionContext>, line: string, cursor: number): void {
  const word = getPreviousWord(line, cursor).toLowerCase();

  switch (word) {
    case "animation":
      return prefixedData(RP_Animations.provideCompletion, BP_Animations.provideCompletion, context);

    case "controller":
      return prefixedData(
        (context) => {
          RP_Animations_Controllers.provideCompletion(context);
          RP_Render_Controllers.provideCompletion(context);
        },
        BP_Animation_Controllers.provideCompletion,
        context
      );

    case "q":
    case "query":
      return Query.provideCompletion(context);

    case "m":
    case "math":
      return Math.provideCompletion(context);

    case "geometry":
      return Geometry.provideCompletion(context);

    case "material":
      return Material.provideCompletion(context);

    case "v":
    case "variable":
      return Variables.provideCompletion(context);

    case "t":
    case "texture":
      return Texture.provideCompletion(context);

    case "temp":
      return Temps.provideCompletion(context);
  }

  const { document, builder } = context;

  if (line.length === 0 || IsMolang(line) || document.languageId == Languages.McMolangIdentifier) {
    builder.add({ label: "query", documentation: "Molang queries", kind: CompletionItemKind.Class });
    builder.add({ label: "variable", documentation: "Defined variables", kind: CompletionItemKind.Variable });
    builder.add({ label: "math", documentation: "Math functions", kind: CompletionItemKind.Class });
    builder.add({ label: "texture", documentation: "Texture definitions", kind: CompletionItemKind.Property });
    builder.add({ label: "material", documentation: "Material definitions", kind: CompletionItemKind.Property });
    builder.add({ label: "geometry", documentation: "Geometry definitions", kind: CompletionItemKind.Property });
    builder.add({ label: "temp", documentation: "Temporary variable definitions", kind: CompletionItemKind.Variable });
    builder.add({ label: "this", documentation: "refers to this object", kind: CompletionItemKind.Struct });
  }
}

type functioncall = (context: Context<CompletionContext>) => void;

/**
 *
 * @param RP
 * @param BP
 * @param context
 */
function prefixedData(RP: functioncall, BP: functioncall, context: Context<CompletionContext>): void {
  const type = PackType.detect(context.document.uri);

  //register new OnNewItem event to prune ids
  const ncontext = Context.modify(context, {
    builder: context.builder.withEvents((item) => {
      item.label = IDRemoveFirst(item.label);
    }),
  });

  switch (type) {
    case PackType.behavior_pack:
      return BP(ncontext);

    case PackType.resource_pack:
      return RP(ncontext);
  }
}

/**
 *
 * @param id
 * @returns
 */
function IDRemoveFirst(id: string): string {
  const index = id.indexOf(".");

  if (index > -1) return id.substring(index + 1);

  return id;
}
