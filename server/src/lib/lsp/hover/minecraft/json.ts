import { Hover } from "vscode-languageserver";
import { Range } from "vscode-languageserver-protocol";
import { getCurrentString } from "../../../minecraft/json/functions";
import { IsMolang } from "../../../minecraft/molang/functions";
import { Context } from "../../context/context";
import { HoverContext } from "../context";

import * as Molang from "./molang";

export function provideHover(context: Context<HoverContext>): Hover | undefined {
  const { document, params, database } = context;

  const cursor = document.offsetAt(params.position);
  const text = document.getText();
  const range = getCurrentString(text, cursor);

  //If start has not been found or not a property
  if (range === undefined) return;

  //Prepare data to be fixed for json
  const currentText = text.substring(range.start, range.end);
  const R = Range.create(params.position, {
    character: params.position.character + currentText.length,
    line: params.position.line,
  });

  if (IsMolang(currentText)) {
    return Molang.provideHoverAt(context, currentText, range, cursor);
  }

  //Check project data
  const reference = database.ProjectData.find((item) => item.id === currentText);

  if (reference?.documentation) {
    return {
      contents: { kind: "markdown", value: reference.documentation, language: "en-gb" },
      range: R,
    };
  }

  return undefined;
}
