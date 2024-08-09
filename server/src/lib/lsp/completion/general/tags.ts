import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { getFilename } from "../../../util";
import { Kinds } from "../../../constants";
import { CompletionContext } from "../context";
import { Context } from "../../context/context";

export function provideCompletion(context: Context<CompletionContext>): void {
  const builder = context.builder;
  const data = context.document.configuration();

  builder.generate(context.database.ProjectData.general.tags, generateDocumentation, Kinds.Completion.Tag);
  builder.generate(data.definitions.tag?.defined, generateDocumentation, Kinds.Completion.Tag);
}

function generateDocumentation(tag: GeneralInfo | string): string {
  if (typeof tag === "string") return `The tag: ${tag}`;

  const filename = getFilename(tag.location.uri);

  return `The tag: ${tag.id}\nLocation: ${filename}`;
}

export function provideCompletionTest(context: Context<CompletionContext>): void {
  const data = context.document.configuration();
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
  context.database.ProjectData.general.tags.forEach((tag) => {
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
