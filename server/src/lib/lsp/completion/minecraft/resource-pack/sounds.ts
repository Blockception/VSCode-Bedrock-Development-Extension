import path from "path";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../../util";
import { CompletionBuilder } from "../../builder/builder";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { Kinds } from "../../../../constants/kinds";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { IsEducationEnabled } from "../../../../project/attributes";
import { MinecraftFormat } from "../../../../minecraft/format";
import { ResourcePack } from "bc-minecraft-bedrock-project";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The sound: ${item.id}`;
  const generateV = (item: string) => `The vanilla sound: ${item}`;

  context.builder.generate(context.projectData.ResourcePacks.sounds, generateDoc, Kinds.Completion.Sound);
  context.builder.generate(MinecraftData.vanilla.ResourcePack.sounds, generateV, Kinds.Completion.Sound);

  //Education data
  if (IsEducationEnabled(context.doc))
    context.builder.generate(MinecraftData.edu.ResourcePack.sounds, generateV, Kinds.Completion.Sound);
}

/**Looks for all the sound files in the given pack and returns them as completion text
 * @param doc
 * @returns
 */
export function provideSoundFileCompletion(context: SimpleContext<CompletionBuilder>): void {
  const RP = context.doc.getPack();

  //No associated pack, then do nothing
  if (!ResourcePack.ResourcePack.is(RP)) return;
  const files = MinecraftFormat.GetAudioFiles(RP.folder, RP.context.ignores.patterns);

  files.forEach((filepath) => {
    const index = filepath.indexOf("sounds");
    if (index <= 0) {
      return;
    }
    const ext = path.extname(filepath);
    const id = filepath.substring(index, filepath.length - ext.length);

    context.builder.add({
      label: id,
      documentation: filepath,
      kind: CompletionItemKind.File,
    });
  });
}
