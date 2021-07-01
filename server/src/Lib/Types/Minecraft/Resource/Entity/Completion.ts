import path from "path";
import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../../../Completion/Builder";
import { Glob } from "../../../../Glob/include";
import { GetCurrentString, TextDocument } from "../../../Document/include";
import { GetResourcePack } from "../Functions";

export function ProvideCompletion(doc: TextDocument, cursor: number, receiver: CompletionBuilder): void {
  const text = doc.getText();
  const range = GetCurrentString(text, cursor);

  if (!range) return;

  const data = text.substring(range.start, range.end);

  if (!data.includes("textures/")) return;

  const RP = GetResourcePack(doc.uri, "entity");
  const files = Glob.GetFiles(["textures/**/*.png", "textures/*.png", "textures/**/*.tga", "textures/*.tga"], doc.getConfiguration().ignores, RP);

  files.forEach((filepath) => {
    const index = filepath.indexOf("textures");

    if (index > 0) {
      const ext = path.extname(filepath);
      const id = filepath.substring(index, filepath.length - ext.length);

      const text = '"' + id + '"';
      let item = receiver.Add(id, filepath, CompletionItemKind.File, text);
      item.filterText = text;

      item.sortText = id.includes("entity") ? "0" : "1";
    }
  });
}
