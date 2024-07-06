import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { GetFilename, SimpleContext } from "../../../Code";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { Kinds } from "../Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const receiver = context.receiver;

  receiver.Generate(Database.ProjectData.General.tags, generateDocumentation, Kinds.Completion.Tag);

  const data = context.doc.getConfiguration();
  receiver.GenerateStr(data.definitions.tag?.defined, generateDocumentation, Kinds.Completion.Tag);
}

function generateDocumentation(tag: GeneralInfo | string): string {
  if (typeof tag === "string") return `The tag: ${tag}`;

  const filename = GetFilename(tag.location.uri);

  return `The tag: ${tag.id}\nLocation: ${filename}`;
}

export function provideCompletionTest(context: SimpleContext<CompletionBuilder>): void {
  const data = context.doc.getConfiguration();
  const receiver = context.receiver;
  receiver.Add("Any Tag: `tag=`", "By inserting an `tag=` you test for entities with any kind of tag", Kinds.Completion.Tag, "");
  receiver.Add("No Tags: `tag=!`", "By inserting an `tag=!` you test for entities with no tags", Kinds.Completion.Tag, "!");

  //Add defined tags to the context
  data.definitions.tag?.defined.forEach((tag) => receiver.Add(tag, "The defined tag: " + tag, Kinds.Completion.Tag));

  //Add the tags to the list
  Database.ProjectData.General.tags.forEach((tag) => {
    receiver.Add(tag.id, `Tests for the tag: '${tag.id}'`, Kinds.Completion.Tag);
    receiver.Add("!" + tag.id, `Tests not for the tag: '${tag.id}'`, Kinds.Completion.Tag);
  });
}
