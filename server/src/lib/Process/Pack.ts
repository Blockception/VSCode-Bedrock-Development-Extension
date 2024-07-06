import { BehaviorPack, Pack } from "bc-minecraft-bedrock-project";
import { Fs } from "../Code/Url";
import { Database } from "../Database/Database";
import { Console } from "../Manager/Console";
import { MinecraftFormat } from "../Minecraft/Format";
import { ForEachDocument } from "../Types/Document/Document";

/**
 *
 * @param pack
 */
export function ProcessPack(pack: Pack): Promise<string[]> {
  Console.Info(`Processing pack: ${Fs.FromVscode(pack.folder)}`);

  const P = ForEachDocument(MinecraftFormat.GetPackFiles(pack), (doc) => {
    Database.ProjectData.process(doc);
  });

  if (BehaviorPack.BehaviorPack.is(pack)) {
    const structures = MinecraftFormat.GetStructureFiles(pack.folder, pack.context.ignores.patterns);

    const emptyText = () => "";
    structures.forEach((item) => {
      pack.process({ getText: emptyText, uri: item });
    });
  }

  return P;
}
