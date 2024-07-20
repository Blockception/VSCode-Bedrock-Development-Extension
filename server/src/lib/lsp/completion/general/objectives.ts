import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { GetFilename, SimpleContext } from "../../../util";
import { CompletionBuilder } from "../builder/builder";
import { Database } from "../../../lsp/database/database";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const builder = context.builder;
  const data = context.doc.getConfiguration();

  const generateDoc = (item: GeneralInfo | string) => {
    if (typeof item === "string") {
      return `The objective: ${item}`;
    }

    const filename = GetFilename(item.location.uri);

    return `The objective: ${item.id}\nLocation: ${filename}`;
  };

  //From project data
  builder.generate(Database.ProjectData.General.objectives, generateDoc, Kinds.Completion.Objectives);
  builder.generate(data.definitions.objective?.defined, generateDoc, Kinds.Completion.Objectives);
}
