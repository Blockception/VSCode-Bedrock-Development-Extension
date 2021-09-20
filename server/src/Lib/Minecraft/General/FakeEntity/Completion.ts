import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { GetFilename } from "../../../Code/File";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(context: CommandCompletionContext): void {
  const generateDoc = (fakeEntities: GeneralInfo) => {
    const filename = GetFilename(fakeEntities.location.uri);
    return `The dummy entity: ${fakeEntities.id}\nLocation: ${filename}`;
  };

  context.receiver.Generate(Database.ProjectData.General.fakeEntities, generateDoc, Kinds.Completion.FakeEntity);
}
