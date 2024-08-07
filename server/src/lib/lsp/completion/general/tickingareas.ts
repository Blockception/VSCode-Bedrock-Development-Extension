import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { CompletionContext } from "../context";
import { Context } from "../../context/context";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: GeneralInfo) => `The tickingarea: ${item.id}\nLocation: ${item.location.uri}`;
  const builder = context.builder;
  const data = context.document.configuration();

  builder.generate(context.database.ProjectData.general.tickingAreas, generateDoc, Kinds.Completion.Tickingarea);
  builder.generate(data.definitions.tag?.defined, (item) => `The defined tickingarea: ${item}`, Kinds.Completion.Tickingarea);
}
