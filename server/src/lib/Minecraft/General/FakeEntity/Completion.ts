import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/lib/Project/General/Types/GeneralInfo";
import { GetFilename } from "../../../Code/File";
import { CommandCompletionContext } from "../../../Completion/Context";
import { Database } from "../../../Database/Database";
import { Kinds } from "../Kinds";

export function provideCompletion(context: CommandCompletionContext): void {
  const generateDoc = (fakeEntities: GeneralInfo) => {
    const filename = GetFilename(fakeEntities.location.uri);
    return `The dummy entity: ${fakeEntities.id}\nLocation: ${filename}`;
  };

  context.receiver.Generate(Database.ProjectData.General.fakeEntities, generateDoc, Kinds.Completion.FakeEntity);
}
