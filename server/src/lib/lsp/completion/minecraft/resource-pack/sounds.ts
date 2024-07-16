import path from "path";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../../Code";
import { CompletionBuilder } from "../../builder/builder";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { Database } from "../../../../database/database";
import { Kinds } from "../../../../constants/kinds";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { IsEducationEnabled } from "../../../../project/attributes";
import { MinecraftFormat } from "../../../../minecraft/Format";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The sound: ${item.id}`;

  context.receiver.generate(Database.ProjectData.ResourcePacks.sounds, generateDoc, Kinds.Completion.Sound);

  //Generate for vanilla data
  const generateV = (item: string) => `The vanilla sound: ${item}`;

  //Vanilla data
  context.receiver.generate(MinecraftData.vanilla.ResourcePack.sounds, generateV, Kinds.Completion.Sound);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.generate(MinecraftData.edu.ResourcePack.sounds, generateV, Kinds.Completion.Sound);
}

/**Looks for all the sound files in the given pack and returns them as completion text
 * @param doc
 * @returns
 */
export function provideSoundFileCompletion(context: SimpleContext<CompletionBuilder>): void {
  const RP = context.doc.getPack();

  //No associated pack, then do nothing
  if (RP === undefined) return;

  const files = MinecraftFormat.GetAudioFiles(RP.folder, RP.context.ignores.patterns);

  files.forEach((filepath) => {
    const index = filepath.indexOf("sounds");

    if (index > 0) {
      const ext = path.extname(filepath);
      const id = filepath.substring(index, filepath.length - ext.length);

      context.receiver.add({ label:id, documentation: filepath, kind: CompletionItemKind.File, insertText: '"' + id + '"'}).filterText = '"' + id + '"';
    }
  });
}
