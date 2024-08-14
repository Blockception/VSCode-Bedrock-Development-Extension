import { OffsetWord } from "bc-vscode-words";
import { Location, Position } from "vscode-languageserver";
import { Context } from "../../context/context";
import { ReferenceContext } from "../context";

import * as Command from "./commands";

export function provideReferences(context: Context<ReferenceContext>): Promise<Location[] | undefined> {
  const { document, position } = context;

  //Gets start of line
  const startP = Position.create(position.line, 0);
  const line = document.getLine(startP.line);
  const lineOffset = document.offsetAt(startP);

  return Command.provideReferences(context, new OffsetWord(line, lineOffset));
}
