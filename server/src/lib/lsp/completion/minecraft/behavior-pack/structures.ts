import { Identifiable } from "bc-minecraft-bedrock-types/lib/types/identifiable";
import { Kinds } from "../../../../constants";
import { Context } from "../../../context/context";
import { CompletionContext } from "../../context";

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The mcstructure: ${item.id}`;

  context.builder.generate(
    context.database.ProjectData.behaviorPacks.structures,
    generateDoc,
    Kinds.Completion.Structure
  );

  //No vanilla data
}
