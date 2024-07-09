import { CompletionBuilder } from "../../builder/builder";
import { CompletionItemKind, Position } from "vscode-languageserver-types";
import { GetPreviousWord, IsMolang } from "../../../Minecraft/Molang/Functions";
import { PackType } from "bc-minecraft-bedrock-project";
import { SimpleContext } from "../../../Code/SimpleContext";
import { Languages } from "@blockception/shared";

import * as Geometry from "./geometry";
import * as Material from "./materials";
import * as Math from "./math";
import * as Query from "./query";
import * as Temps from "./temps";
import * as Texture from "./texture";
import * as Variables from "./variables";

import * as RP_Animations from "../resource-pack/animations";
import * as RP_Animations_Controllers from "../resource-pack/animation-controllers";
import * as RP_Render_Controllers from "../resource-pack/render-controllers";
import * as BP_Animations from "../behavior-pack/animations";
import * as BP_Animation_Controllers from "../behavior-pack/animation-controllers";

export function provideDocCompletion(context: SimpleContext<CompletionBuilder>, pos: Position): void {
  const doc = context.doc;
  const line = doc.getLine(pos.line);
  const cursor = doc.offsetAt(pos);

  return provideCompletion(line, cursor, context);
}

/**
 *
 * @param line
 * @param cursor
 * @param doc
 * @param receiver
 * @returns
 */
export function provideCompletion(line: string, cursor: number, context: SimpleContext<CompletionBuilder>): void {
  const word = GetPreviousWord(line, cursor).toLowerCase();

  switch (word) {
    case "animation":
      return PrefixedData(RP_Animations.provideCompletion, BP_Animations.provideCompletion, context);

    case "controller":
      return PrefixedData(
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

  const doc = context.doc;
  const receiver = context.receiver;

  if (IsMolang(line) || doc.languageId == Languages.McMolangIdentifier) {
    receiver.Add("query", "Molang queries", CompletionItemKind.Class);
    receiver.Add("variable", "Defined variables", CompletionItemKind.Variable);
    receiver.Add("math", "Math functions", CompletionItemKind.Class);
    receiver.Add("texture", "Texture definitions", CompletionItemKind.Property);
    receiver.Add("material", "Material definitions", CompletionItemKind.Property);
    receiver.Add("geometry", "Geometry definitions", CompletionItemKind.Property);
    receiver.Add("temp", "Temporary variable definitions", CompletionItemKind.Variable);
    receiver.Add("this", "refers to this object", CompletionItemKind.Struct);

    Query.provideCompletion(context);
    Math.provideCompletion(context);
  }
}

type functioncall = (context: SimpleContext<CompletionBuilder>) => void;

/**
 *
 * @param RP
 * @param BP
 * @param context
 */
function PrefixedData(RP: functioncall, BP: functioncall, context: SimpleContext<CompletionBuilder>): void {
  const type = PackType.detect(context.doc.uri);

  //register new OnNewItem event to prune ids
  const cancelFn = context.receiver.OnNewItem((item, next) => {
    item.label = IDRemoveFirst(item.label);

    next(item);
  });

  switch (type) {
    case PackType.behavior_pack:
      BP(context);
      break;

    case PackType.resource_pack:
      RP(context);
      break;
  }

  //Restore old OnNewItem
  cancelFn();
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
