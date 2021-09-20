import path from "path";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code/include";
import { CompletionBuilder } from "../../../Completion/Builder";
import { MinecraftFormat } from "../../include";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { Database } from "../../../Database/include";
import { Kinds } from "../../General/Kinds";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The sound: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.ResourcePacks.sounds, generateDoc, Kinds.Completion.RenderController);
}

/**Looks for all the sound files in the given pack and returns them as completion text
 * @param doc
 * @returns
 */
export function ProvideSoundFileCompletion(context: SimpleContext<CompletionBuilder>): void {
  const RP = context.doc.getPack();

  //No associated pack, then do nothing
  if (RP === undefined) return;

  const files = MinecraftFormat.GetAudioFiles(RP.folder, RP.context.ignores.patterns);

  files.forEach((filepath) => {
    const index = filepath.indexOf("sounds");

    if (index > 0) {
      const ext = path.extname(filepath);
      const id = filepath.substring(index, filepath.length - ext.length);

      context.receiver.Add(id, filepath, CompletionItemKind.File, '"' + id + '"').filterText = '"' + id + '"';
    }
  });
}
