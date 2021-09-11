import path from "path";
import { CompletionItemKind } from "vscode-languageserver-types";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Glob } from "../../../Glob/Glob";
import { GetCurrentString, TextDocument } from "../../../Types/Document/include";
import { GetResourcePack } from "../../../Types/Minecraft/Resource/Functions";

export function ProvideCompletion(doc: TextDocument, cursor: number, receiver: CompletionBuilder): void {
  const text = doc.getText();
  const range = GetCurrentString(text, cursor);

  if (!range) return;

  const data = text.substring(range.start, range.end);

  if (!data.includes("sounds/")) return;

  const RP = GetResourcePack(doc.uri, "sounds");
  const files = Glob.GetFiles(["sounds/**/*.ogg", "sounds/*.ogg", "sounds/**/*.fsb", "sounds/*.fsb"], doc.getConfiguration().ignores, RP);

  files.forEach((filepath) => {
    const index = filepath.indexOf("sounds");

    if (index > 0) {
      const ext = path.extname(filepath);
      const id = filepath.substring(index, filepath.length - ext.length);

      receiver.Add(id, filepath, CompletionItemKind.File, '"' + id + '"').filterText = '"' + id + '"';
    }
  });
}
