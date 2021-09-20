import { SimpleContext } from "../../../Code/include";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/include";
import { GetCurrentString } from "../../../Types/Document/include";
import { ProvideSoundFileCompletion } from "../Sounds/Completion";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>, cursor: number): void {
  const text = context.doc.getText();
  const range = GetCurrentString(text, cursor);

  if (!range) return;

  const data = text.substring(range.start, range.end);

  //TODO redo this
  if (!data.includes("sounds/")) return;

  ProvideSoundFileCompletion(context);

  Database.ProjectData.ResourcePacks;
}
