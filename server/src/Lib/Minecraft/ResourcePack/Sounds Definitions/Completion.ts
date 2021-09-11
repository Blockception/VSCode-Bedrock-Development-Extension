import { CompletionBuilder } from "../../../Completion/Builder";
import { GetCurrentString, TextDocument } from "../../../Types/Document/include";
import { ProvideSoundFileCompletion } from "../Sounds/Completion";

export function ProvideCompletion(doc: TextDocument, cursor: number, receiver: CompletionBuilder): void {
  const text = doc.getText();
  const range = GetCurrentString(text, cursor);

  if (!range) return;

  const data = text.substring(range.start, range.end);

  if (!data.includes("sounds/")) return;

  ProvideSoundFileCompletion(doc, receiver);
}
