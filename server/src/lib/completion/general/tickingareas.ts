import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { SimpleContext } from "../../Code";
import { CompletionBuilder } from "../builder/builder";
import { Database } from "../../Database/Database";
import { Kinds } from "../../Minecraft/General/Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: GeneralInfo) => `The tickingarea: ${item.id}\nLocation: ${item.location.uri}`;

  const receiver = context.receiver;

  receiver.generate(Database.ProjectData.General.tickingAreas, generateDoc, Kinds.Completion.Tickingarea);

  const data = context.doc.getConfiguration();

  receiver.generate(data.definitions.tag?.defined, (item) => `The defined tickingarea: ${item}`, Kinds.Completion.Tickingarea);
}
