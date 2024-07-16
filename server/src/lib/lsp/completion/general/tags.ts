import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { GetFilename, SimpleContext } from "../../../Code";
import { CompletionBuilder } from "../builder/builder";
import { Database } from "../../../database/database";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const receiver = context.receiver;
  const data = context.doc.getConfiguration();

  receiver.generate(Database.ProjectData.General.tags, generateDocumentation, Kinds.Completion.Tag);
  receiver.generate(data.definitions.tag?.defined, generateDocumentation, Kinds.Completion.Tag);
}

function generateDocumentation(tag: GeneralInfo | string): string {
  if (typeof tag === "string") return `The tag: ${tag}`;

  const filename = GetFilename(tag.location.uri);

  return `The tag: ${tag.id}\nLocation: ${filename}`;
}

export function provideCompletionTest(context: SimpleContext<CompletionBuilder>): void {
  const data = context.doc.getConfiguration();
  const receiver = context.receiver.withDefaults({ kind: Kinds.Completion.Tag });

  receiver.add({
    label: "Any Tag: `tag=`",
    documentation: "By inserting an `tag=` you test for entities with any kind of tag",
    insertText: "",
  });
  receiver.add({
    label: "No Tags: `tag=!`",
    documentation: "By inserting an `tag=!` you test for entities with no tags",
    insertText: "!",
  });

  //Add defined tags to the context
  receiver.generate(data.definitions.tag?.defined, (tag) => `The defined tag: ${tag}`);

  //Add the tags to the list
  Database.ProjectData.General.tags.forEach((tag) => {
    receiver.add({
      label: tag.id,
      documentation: `Tests for the tag: '${tag.id}'`,
    });
    receiver.add({
      label: `!${tag.id}`,
      documentation: `Tests not for the tag: '${tag.id}'`,
    });
  });
}
