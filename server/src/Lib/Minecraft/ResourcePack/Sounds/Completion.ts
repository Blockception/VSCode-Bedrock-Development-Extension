import path from "path";
import { CompletionItemKind } from "vscode-languageserver-types";
import { CompletionBuilder } from "../../../Completion/Builder";
import { TextDocument } from "../../../Types/Document/include";
import { MinecraftFormat } from "../../include";

/**Looks for all the sound files in the given pack and returns them as completion text
 * @param doc
 * @returns
 */
export function ProvideSoundFileCompletion(doc: TextDocument, receiver: CompletionBuilder): void {
  const RP = doc.getPack();

  //No associated pack, then do nothing
  if (RP === undefined) return;

  const files = MinecraftFormat.GetAudioFiles(RP.folder, RP.context.ignores.patterns);

  files.forEach((filepath) => {
    const index = filepath.indexOf("sounds");

    if (index > 0) {
      const ext = path.extname(filepath);
      const id = filepath.substring(index, filepath.length - ext.length);

      receiver.Add(id, filepath, CompletionItemKind.File, '"' + id + '"').filterText = '"' + id + '"';
    }
  });
}
