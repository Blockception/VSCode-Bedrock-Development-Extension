import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { GetFilename, SimpleContext } from "../../../Code/include";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const receiver = context.receiver;

  const generateDoc = (item: GeneralInfo | string) => {
    if (typeof item === "string") {
      return `The objective: ${item}`;
    }

    const filename = GetFilename(item.location.uri);

    return `The objective: ${item.id}\nLocation: ${filename}`;
  };

  receiver.Generate(Database.ProjectData.General.objectives, generateDoc, Kinds.Completion.Objectives);

  const data = context.doc.getConfiguration();
  const defined = data.definitions.objective?.defined;

  if (defined) receiver.GenerateStr(defined, generateDoc, Kinds.Completion.Objectives);
}
