import { GeneralInfo } from 'bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo';
import { Kinds } from "../../../constants";
import { getFilename } from "../../../util";
import { Context } from '../../context/context';
import { CommandCompletionContext } from "../context";

export function provideCompletion(context: Context<CommandCompletionContext>): void {
  const generateDoc = (fakeEntities: GeneralInfo) => {
    const filename = getFilename(fakeEntities.location.uri);
    return `The dummy entity: ${fakeEntities.id}\nLocation: ${filename}`;
  };

  context.builder.generate(context.database.ProjectData.general.fakeEntities, generateDoc, Kinds.Completion.FakeEntity);
}
