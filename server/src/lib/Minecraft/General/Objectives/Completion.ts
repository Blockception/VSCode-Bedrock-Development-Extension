import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { GetFilename, SimpleContext } from "../../../Code";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { Kinds } from "../Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const receiver = context.receiver;

  const generateDoc = (item: GeneralInfo | string) => {
    if (typeof item === "string") {
      return `The objective: ${item}`;
    }

    const filename = GetFilename(item.location.uri);

    return `The objective: ${item.id}\nLocation: ${filename}`;
  };

  //From project data
  receiver.Generate(Database.ProjectData.General.objectives, generateDoc, Kinds.Completion.Objectives);

  const data = context.doc.getConfiguration();

  //From definitions
  receiver.GenerateStr(data.definitions.objective?.defined, generateDoc, Kinds.Completion.Objectives);
}
