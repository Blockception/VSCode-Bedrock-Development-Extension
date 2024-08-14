import { OffsetWord } from "bc-vscode-words";
import { Kinds } from "../../../../constants";
import { Context } from "../../../context/context";
import { CompletionContext } from "../../context";
import { Boolean } from "../../general";
import { IsEditingValue } from "./attribute-values";
import { GetCurrentAttribute } from "./attributes";

import * as Float from "../../general/float";
import * as Integer from "../../general/integer";

export function provideCompletion(context: Context<CompletionContext>, selector: OffsetWord, pos: number): void {
  const builder = context.builder;

  if (IsEditingValue(selector, pos)) {
    const propertyName = GetCurrentAttribute(selector, pos);

    context.database.ProjectData.behaviorPacks.entities.forEach((entity) => {
      entity.properties.forEach((property) => {
        if (property.name !== propertyName) return;

        const ncontext = {
          ...context,
          builder: builder.withEvents((item) => {
            const msg = `property: ${property.name} of type ${property.type}.<br/>defaults: ${property.default}.<br/>defined by ${entity.id}.`;
            if (typeof item.documentation === "string" || item.documentation === undefined) {
              item.documentation = {
                kind: "markdown",
                value: `${item.documentation}\n${msg}`.trim(),
              };
            } else {
              item.documentation.value = `${item.documentation.value}\n${msg}`.trim();
            }
          }),
        };

        switch (property.type) {
          case "bool":
            Boolean.provideCompletion(ncontext);
            break;
          case "int":
            Integer.provideCreateCompletion(ncontext.builder, property.range[0], property.range[1]);
            break;
          case "float":
            Float.provideCreateCompletion(ncontext.builder, property.range[0], property.range[1]);
            break;
          case "enum":
            property.values.forEach((item) => ncontext.builder.add({ label: item, kind: Kinds.Completion.Property }));
            break;
        }
      });
    });
  }

  context.database.ProjectData.behaviorPacks.entities.forEach((entity) => {
    entity.properties.forEach((property) => {
      const msg = `property: ${property.name} of type ${property.type}.<br/>defaults: ${property.default}.<br/>defined by ${entity.id}.`;

      builder.add({ label: property.name, documentation: msg, kind: Kinds.Completion.Property });
    });
  });
}
