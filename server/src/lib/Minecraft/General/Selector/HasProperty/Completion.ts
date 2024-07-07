import { OffsetWord } from "bc-vscode-words";
import { SimpleContext } from "../../../../Code";
import { CompletionBuilder } from "../../../../Completion/builder/builder";
import { Kinds } from "../../Kinds";
import { GetCurrentAttribute } from "../Attributes/Completion";
import { IsEditingValue } from "../AttributeValue/Completion";
import { Database } from "../../../../Database/Database";
import { Boolean } from "../..";

import * as Float from "../../Float/Completion";
import * as Integer from "../../Integer/Completion";

export function provideCompletion(context: SimpleContext<CompletionBuilder>, selector: OffsetWord, pos: number): void {
  const receiver = context.receiver;

  if (IsEditingValue(selector, pos)) {
    const propertyName = GetCurrentAttribute(selector, pos);

    Database.ProjectData.BehaviorPacks.entities.forEach((entity) => {
      entity.properties.forEach((property) => {
        if (property.name !== propertyName) return;

        const cancelFn = receiver.OnNewItem((item, next) => {
          const msg = `property: ${property.name} of type ${property.type}.<br/>defaults: ${property.default}.<br/>defined by ${entity.id}.`;
          if (typeof item.documentation === "string" || item.documentation === undefined) {
            item.documentation = {
              kind: "markdown",
              value: `${item.documentation}\n${msg}`.trim(),
            };
          } else {
            item.documentation.value = `${item.documentation.value}\n${msg}`.trim();
          }

          next(item);
        });

        switch (property.type) {
          case "bool":
            Boolean.provideCompletion(receiver);
            break;
          case "int":
            Integer.provideCreateCompletion(receiver, property.range[0], property.range[1]);
            break;
          case "float":
            Float.provideCreateCompletion(receiver, property.range[0], property.range[1]);
            break;
          case "enum":
            property.values.forEach((item) => receiver.Add(item, "", Kinds.Completion.Property));
            break;
        }

        cancelFn();
      });
    });
  }

  Database.ProjectData.BehaviorPacks.entities.forEach((entity) => {
    entity.properties.forEach((property) => {
      const msg = `property: ${property.name} of type ${property.type}.<br/>defaults: ${property.default}.<br/>defined by ${entity.id}.`;

      receiver.Add(property.name, msg, Kinds.Completion.Property);
    });
  });
}
