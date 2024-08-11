import { CompletionItemKind } from "vscode-languageserver-types";
import { CompletionContext } from '../../context';
import { Context } from '../../../context/context';
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { Kinds } from "../../../../constants";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { IsEducationEnabled } from "../../../../project/attributes";
import { MinecraftFormat } from "../../../../minecraft/format";
import { ResourcePack } from "bc-minecraft-bedrock-project";
import { getExtension } from '../../../../util';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The sound: ${item.id}`;
  const generateV = (item: string) => `The vanilla sound: ${item}`;

  context.builder.generate(context.database.ProjectData.resourcePacks.sounds, generateDoc, Kinds.Completion.Sound);
  context.builder.generate(MinecraftData.vanilla.ResourcePack.sounds, generateV, Kinds.Completion.Sound);

  //Education data
  if (IsEducationEnabled(context.document))
    context.builder.generate(MinecraftData.edu.ResourcePack.sounds, generateV, Kinds.Completion.Sound);
}

/**Looks for all the sound files in the given pack and returns them as completion text
 * @param doc
 * @returns
 */
export function provideSoundFileCompletion(context: Context<CompletionContext>): void {
  const RP = context.document.pack();

  //No associated pack, then do nothing
  if (!ResourcePack.ResourcePack.is(RP)) return;
  const files = MinecraftFormat.GetAudioFiles(RP.folder, RP.context.ignores.patterns);

  files.forEach((filepath) => {
    const index = filepath.indexOf("sounds");
    if (index <= 0) {
      return;
    }
    const ext = getExtension(filepath);
    const id = filepath.substring(index, filepath.length - ext.length);

    context.builder.add({
      label: id,
      documentation: filepath,
      kind: CompletionItemKind.File,
    });
  });
}
