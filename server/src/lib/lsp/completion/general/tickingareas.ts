import { GeneralInfo } from 'bc-minecraft-bedrock-project/lib/src/project/general/types';
import { Kinds } from "../../../constants";
import { Context } from "../../context/context";
import { CompletionContext } from "../context";

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: GeneralInfo) => `The tickingarea: ${item.id}\nLocation: ${item.location.uri}`;
  const builder = context.builder;
  const data = context.document.configuration();

  builder.generate(context.database.ProjectData.general.tickingAreas, generateDoc, Kinds.Completion.Tickingarea);
  builder.generate(data.definitions.tag?.defined, (item) => `The defined tickingarea: ${item}`, Kinds.Completion.Tickingarea);
}
