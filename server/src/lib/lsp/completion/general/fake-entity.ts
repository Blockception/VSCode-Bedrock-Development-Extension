import { GeneralInfo } from 'bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo';
import { GetFilename } from "../../../Code/File";
import { CommandCompletionContext } from "../builder/context";
import { Database } from "../../../database/database";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: CommandCompletionContext): void {
  const generateDoc = (fakeEntities: GeneralInfo) => {
    const filename = GetFilename(fakeEntities.location.uri);
    return `The dummy entity: ${fakeEntities.id}\nLocation: ${filename}`;
  };

  context.receiver.generate(Database.ProjectData.General.fakeEntities, generateDoc, Kinds.Completion.FakeEntity);
}
