import { GeneralInfo } from 'bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo';
import { getFilename } from "../../../util";
import { CommandCompletionContext } from "../context";
import { Kinds } from "../../../constants";
import { Context } from '../../context/context';

export function provideCompletion(context: Context<CommandCompletionContext>): void {
  const generateDoc = (fakeEntities: GeneralInfo) => {
    const filename = getFilename(fakeEntities.location.uri);
    return `The dummy entity: ${fakeEntities.id}\nLocation: ${filename}`;
  };

  context.builder.generate(context.database.ProjectData.general.fakeEntities, generateDoc, Kinds.Completion.FakeEntity);
}
