import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/lib/Project/General/Types/GeneralInfo";
import { SimpleContext } from "../../../Code";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { Kinds } from "../Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: GeneralInfo) => `The tickingarea: ${item.id}\nLocation: ${item.location.uri}`;

  const receiver = context.receiver;

  receiver.Generate(Database.ProjectData.General.tickingAreas, generateDoc, Kinds.Completion.Tickingarea);

  const data = context.doc.getConfiguration();

  receiver.GenerateStr(data.definitions.tag?.defined, (item) => `The defined tickingarea: ${item}`, Kinds.Completion.Tickingarea);
}
