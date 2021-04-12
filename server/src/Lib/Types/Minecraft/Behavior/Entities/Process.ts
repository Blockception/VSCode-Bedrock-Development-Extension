import { Location } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { JsonDocument } from "../../../../Code/Json/include";
import { Database } from "../../../../Database/include";
import { DataReference } from "../../../../Database/Types/include";
import { EmptyTypes } from "../../../General/Empty";
import { Entity } from "../../../General/Entity/Entity";
import { Behavior } from "../../include";
import { type_family } from "./Components/minecraft.type_family";
import { ComponentContainer } from "./include";

/**
 * Processes the text document as a behaviour entity definition file
 * @param doc The document to parse
 */
export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Format = JDoc.CastTo<Behavior.Entities.Entity>();

  let entity: Entity | undefined;

  if (Behavior.Entities.Entity.is(Format)) {
    let mce = Format["minecraft:entity"];
    entity = new Entity();

    const ID = mce.description.identifier;

    entity.Identifier = ID;
    entity.Location = Location.create(doc.uri, EmptyTypes.EmptyRange());
    entity.Documentation.value = "The custom entity definition of: " + ID;

    if (mce.events) {
      let EventsNames = Object.getOwnPropertyNames(mce.events);
      entity.Events = EventsNames;
    }

    if (mce.component_groups) {
      let Groups = Object.getOwnPropertyNames(mce.component_groups);
      entity.ComponentGroups = Groups;

      for (let index = 0; index < Groups.length; index++) {
        const element = mce.component_groups[Groups[index]];

        if (element) {
          RetrieveFamilies(element, entity);
        }
      }
    }

    RetrieveFamilies(mce.components, entity);

    Database.Data.Behaviourpack.Entities.Set(new DataReference(entity.Identifier, entity.Location));
    Database.Data.General.Entities.Set(entity);
  }
}

function RetrieveFamilies(componentContainer: ComponentContainer | undefined, receiver: Entity) {
  if (componentContainer == undefined) return;

  let family_comp = componentContainer["minecraft:type_family"];

  if (type_family.is(family_comp)) {
    family_comp.family.forEach((f) => {
      if (!receiver.Families.includes(f)) receiver.Families.push(f);
    });
  }
}
