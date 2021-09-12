import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { GetFilename } from "../../../Code/File";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(context: CommandCompletionContext): void {
  context.receiver.AddFromRange(Database.ProjectData.General.fakeEntities, generateDocumentation, Kinds.Completion.FakeEntity);
}

function generateDocumentation(fakeEntities: GeneralInfo): string | undefined {
  const filename = GetFilename(fakeEntities.location.uri);
  return `The dummy entity: ${fakeEntities.id}\nLocation: ${filename}`;
}
