import { BehaviorPack, Pack } from "bc-minecraft-bedrock-project";
import { HandleError } from "../Code/Error";
import { Fs } from "../Code/Url";
import { Database } from "../Database/include";
import { Console } from "../Manager/Console";
import { MinecraftFormat } from "../Minecraft/Format";
import { Document } from "../Types/include";

/**
 *
 * @param pack
 */
export function ProcessPack(pack: Pack): void {
  Console.Info(`Processing pack: ${Fs.UniformFolder(pack.folder)}`);

  const P = Document.ForEachDocument(MinecraftFormat.GetPackFiles(pack), (doc) => {
    Database.ProjectData.process(doc);
  });

  if (BehaviorPack.BehaviorPack.is(pack)) {
    const structures = MinecraftFormat.GetStructureFiles(pack.folder, pack.context.ignores.patterns);

    const emptyText = () => "";
    structures.forEach((item) => {
      pack.process({ getText: emptyText, uri: item });
    });
  }
}
