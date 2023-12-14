import path from "path";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { Database } from "../../../Database/Database";
import { Kinds } from "../../General/Kinds";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { MinecraftFormat } from "../../Format";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The sound: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.ResourcePacks.sounds, generateDoc, Kinds.Completion.Sound);

  //Generate for vanilla data
  const generateV = (item: string) => `The vanilla sound: ${item}`;

  //Vanilla data
  context.receiver.GenerateStr(MinecraftData.vanilla.ResourcePack.sounds, generateV, Kinds.Completion.Sound);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.GenerateStr(MinecraftData.edu.ResourcePack.sounds, generateV, Kinds.Completion.Sound);
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

      context.receiver.Add(id, filepath, CompletionItemKind.File, '"' + id + '"').filterText = '"' + id + '"';
    }
  });
}
