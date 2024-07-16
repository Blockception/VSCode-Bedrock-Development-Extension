import { OffsetWord } from "bc-vscode-words";
import { SimpleContext } from "../../../../Code";
import { CompletionBuilder } from "../../builder/builder";
import { Kinds } from "../../../../constants/kinds";
import { GetCurrentAttribute } from "./attributes";
import { IsEditingValue } from "./attribute-values";
import { Database } from "../../../../database/database";
import { Boolean } from "../../general";

import * as Float from "../../general/float";
import * as Integer from "../../general/integer";

export function provideCompletion(context: SimpleContext<CompletionBuilder>, selector: OffsetWord, pos: number): void {
  const receiver = context.receiver;

  if (IsEditingValue(selector, pos)) {
    const propertyName = GetCurrentAttribute(selector, pos);

    Database.ProjectData.BehaviorPacks.entities.forEach((entity) => {
      entity.properties.forEach((property) => {
        if (property.name !== propertyName) return;

        const ncontext = {
          ...context,
          receiver: receiver.withEvents((item) => {
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
        }

        switch (property.type) {
          case "bool":
            Boolean.provideCompletion(ncontext);
            break;
          case "int":
            Integer.provideCreateCompletion(ncontext.receiver, property.range[0], property.range[1]);
            break;
          case "float":
            Float.provideCreateCompletion(ncontext.receiver, property.range[0], property.range[1]);
            break;
          case "enum":
            property.values.forEach((item) => ncontext.receiver.add({ label: item, kind: Kinds.Completion.Property }));
            break;
        }
      });
    });
  }

  Database.ProjectData.BehaviorPacks.entities.forEach((entity) => {
    entity.properties.forEach((property) => {
      const msg = `property: ${property.name} of type ${property.type}.<br/>defaults: ${property.default}.<br/>defined by ${entity.id}.`;

      receiver.add({ label: property.name, documentation: msg, kind: Kinds.Completion.Property });
    });
  });
}
