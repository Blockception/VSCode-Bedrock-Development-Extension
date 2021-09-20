import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { SimpleContext } from "../../../Code/include";
import { CompletionBuilder } from "../../../Completion/include";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: GeneralInfo) => `The tickingarea: ${item.id}\nLocation: ${item.location.uri}`;

  context.receiver.Generate(Database.ProjectData.General.tickingAreas, generateDoc, Kinds.Completion.Tickingarea);
}
