import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { Kinds } from "../../../constants";
import { getFilename } from "../../../util";
import { Context } from "../../context/context";
import { CompletionContext } from "../context";

export function provideCompletion(context: Context<CompletionContext>): void {
  const builder = context.builder;
  const data = context.document.configuration();

  const generateDoc = (item: GeneralInfo | string) => {
    if (typeof item === "string") {
      return `The objective: ${item}`;
    }

    const filename = getFilename(item.location.uri);

    return `The objective: ${item.id}\nLocation: ${filename}`;
  };

  //From project data
  builder.generate(context.database.ProjectData.general.objectives, generateDoc, Kinds.Completion.Objectives);
  builder.generate(data.definitions.objective?.defined, generateDoc, Kinds.Completion.Objectives);
}
