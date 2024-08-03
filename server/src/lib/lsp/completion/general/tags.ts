import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { getFilename, SimpleContext } from "../../../util";
import { CompletionBuilder } from "../builder/builder";
import { Database } from "../../../lsp/database/database";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const builder = context.builder;
  const data = context.doc.configuration();

  builder.generate(context.projectData.General.tags, generateDocumentation, Kinds.Completion.Tag);
  builder.generate(data.definitions.tag?.defined, generateDocumentation, Kinds.Completion.Tag);
}

function generateDocumentation(tag: GeneralInfo | string): string {
  if (typeof tag === "string") return `The tag: ${tag}`;

  const filename = getFilename(tag.location.uri);

  return `The tag: ${tag.id}\nLocation: ${filename}`;
}

export function provideCompletionTest(context: SimpleContext<CompletionBuilder>): void {
  const data = context.doc.configuration();
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Tag });

  builder.add({
    label: "Any Tag: `tag=`",
    documentation: "By inserting an `tag=` you test for entities with any kind of tag",
    insertText: "",
  });
  builder.add({
    label: "No Tags: `tag=!`",
    documentation: "By inserting an `tag=!` you test for entities with no tags",
    insertText: "!",
  });

  //Add defined tags to the context
  builder.generate(data.definitions.tag?.defined, (tag) => `The defined tag: ${tag}`);

  //Add the tags to the list
  context.projectData.General.tags.forEach((tag) => {
    builder.add({
      label: tag.id,
      documentation: `Tests for the tag: '${tag.id}'`,
    });
    builder.add({
      label: `!${tag.id}`,
      documentation: `Tests not for the tag: '${tag.id}'`,
    });
  });
}
