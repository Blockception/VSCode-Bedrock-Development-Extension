import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { SimpleContext } from "../../../util";
import { CompletionBuilder } from "../builder/builder";
import { Database } from "../../../lsp/database/database";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: GeneralInfo) => `The tickingarea: ${item.id}\nLocation: ${item.location.uri}`;
  const builder = context.builder;
  const data = context.doc.getConfiguration();

  builder.generate(context.projectData.General.tickingAreas, generateDoc, Kinds.Completion.Tickingarea);
  builder.generate(data.definitions.tag?.defined, (item) => `The defined tickingarea: ${item}`, Kinds.Completion.Tickingarea);
}
