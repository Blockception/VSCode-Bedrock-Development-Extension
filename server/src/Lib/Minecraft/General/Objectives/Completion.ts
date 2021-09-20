import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { GetFilename } from "../../../Code/include";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(context: CommandCompletionContext): void {
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
