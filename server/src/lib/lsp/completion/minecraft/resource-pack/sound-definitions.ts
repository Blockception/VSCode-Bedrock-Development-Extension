import { SimpleContext } from "../../../../util";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../lsp/database/database";
import { GetCurrentString } from '../../../../minecraft/json/functions';
import { provideSoundFileCompletion } from './sounds';

export function provideCompletion(context: SimpleContext<CompletionBuilder>, cursor: number): void {
  const text = context.doc.getText();
  const range = GetCurrentString(text, cursor);

  if (!range) return;

  const data = text.substring(range.start, range.end);

  //TODO redo this
  if (!data.includes("sounds/")) return;

  provideSoundFileCompletion(context);

  Database.ProjectData.ResourcePacks;
}
