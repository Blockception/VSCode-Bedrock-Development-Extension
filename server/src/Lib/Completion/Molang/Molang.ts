import { CompletionItemKind } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { Languages } from "../../Constants";
import { Database } from "../../Database/include";
import { Molang } from "../../include";
import { Kinds } from "../../Minecraft/General/include";
import { GetPreviousWord } from "../../Molang/include";
import { IsEducationEnabled } from "../../Project/include";
import { TextDocument } from "../../Types/Document/TextDocument";
import { CompletionBuilder } from "../Builder";
import { OnCompletionMolangVariable } from "./Variables";

/**
 *
 * @param doc
 * @param pos
 * @param receiver
 * @returns
 */
export function OnCompletionMolangRequest(doc: TextDocument, pos: Position, receiver: CompletionBuilder) {
  const line = doc.getLine(pos.line);
  return OnCompletionMolang(line, pos.character, doc, receiver);
}

function PrefixedData() {}

function IDRemoveFirst(id: string): string {
  const index = id.indexOf(".");

  if (index > -1) return id.substring(index + 1);

  return id;
}
