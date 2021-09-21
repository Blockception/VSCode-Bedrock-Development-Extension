import { Pack, BehaviorPack, ResourcePack } from "bc-minecraft-bedrock-project";
import { Fs } from "../Code/Url";
import { Console } from "../Manager/Console";
import { MinecraftFormat } from "../Minecraft/Format";
import { Document } from "../Types/include";

/**
 *
 * @param pack
 */
export function ProcessPack(pack: Pack): void {
  Console.Info(`Processing pack: ${Fs.UniformFolder(pack.folder)}`);

  Document.ForEachDocument(MinecraftFormat.GetPackFiles(pack), (doc) => pack.process(doc));
}
