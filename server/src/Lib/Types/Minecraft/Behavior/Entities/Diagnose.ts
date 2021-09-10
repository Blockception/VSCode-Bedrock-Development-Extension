import { DiagnosticSeverity } from "vscode-languageserver-types";
import { JsonDocument } from "../../../Document/Json Document";
import { Database } from "../../../../include";
import { Entity } from "./Entity";
import { TextDocument } from "../../../Document/TextDocument";
import { Script } from "../../../General/include";
import { DiagnosticsBuilder } from "../../../../Diagnostics/include";
import { DiagnoseEvent } from "../Events/Diagnose";

/**
 *
 * @param doc
 */
export function ProvideDiagnostic(doc: TextDocument): void {
  let Builder = new DiagnosticsBuilder(doc);
  const JDoc = new JsonDocument(doc);

  InternalDiagnose(JDoc, Builder);

  Builder.SendDiagnostics();
}

/**
 *
 * @param JDoc
 * @param Builder
 * @returns
 */
function InternalDiagnose(JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  const entity = JDoc.CastTo<Entity>();
  if (entity === undefined || entity === null || !Entity.is(entity)) {
    Builder.Add("Cannot parse entity", undefined, DiagnosticSeverity.Warning).code = "entity.invalid";
    return;
  }

  const description = entity["minecraft:entity"].description;

  if (description.identifier === "minecraft:player") return;

  if (description.animations) {
    for (const id in description.animations) {
      const animation = description.animations[id];
      DiagnoseAnimOrController(animation, JDoc, Builder);
    }
  }

  const events = entity["minecraft:entity"].events;
  if (events) {
    for (const id in events) {
      const event = events[id];

      if (event.add) DiagnoseComponentGroups(event.add.component_groups, entity, JDoc, Builder);
      if (event.remove) DiagnoseComponentGroups(event.remove.component_groups, entity, JDoc, Builder);
    }
  }

  DiagnoseMovement(entity, Builder);

  const eventNames = Object.getOwnPropertyNames(events);

  DiagnoseEvent(entity["minecraft:entity"].component_groups, eventNames, Builder);
  DiagnoseEvent(entity["minecraft:entity"].components, eventNames, Builder);

  Script.ProvideDiagnostic(description.scripts, description.animations, JDoc, Builder);
}

/** Tries to find the animation or animation controller
 * @param id
 * @param JDoc
 * @param Builder
 */
function DiagnoseAnimOrController(id: string, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  if (!(Database.Database.Data.Behaviorpack.Animations.HasID(id) || Database.Database.Data.Behaviorpack.AnimationControllers.HasID(id))) {
    Builder.Add("Cannot find animation or controller: " + id, JDoc.RangeOf(id)).code = "ac.missing";
  }
}

function DiagnoseComponentGroups(groups: string | string[] | undefined, entity: Entity, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  if (groups === undefined) return;

  if (typeof groups === "string") {
    groups = [groups];
  }

  for (var group of groups) {
    if (entity["minecraft:entity"].component_groups) {
      const data = entity["minecraft:entity"].component_groups[group];

      if (data) continue;
    }

    Builder.Add("Cannot find componentgroup: " + group, JDoc.RangeOf(group)).code = "entity.compgroup.missing";
  }
}

function DiagnoseMovement(entity: Entity, Builder: DiagnosticsBuilder): void {
  const hasMovement = Entity.MatchComponentName(entity, "minecraft:movement.") ? 1 : 0;
  const hasNavigation = Entity.MatchComponentName(entity, "minecraft:navigation.") ? 1 : 0;

  const hasBaseMovement = Entity.HasComponentName(entity, "minecraft:movement") ? 1 : 0;
  const Count = hasMovement + hasNavigation + hasBaseMovement;
  const description = entity["minecraft:entity"].description;

  if (Count > 0 && Count != 3) {
    if (hasMovement == 0)
      Builder.Add(
        `${description.identifier}: Has part of movement but no specific movement component was found such as: 'minecraft:movement.basic'`,
        undefined,
        DiagnosticSeverity.Error
      ).code = "entity.movement";
    if (hasNavigation == 0)
      Builder.Add(
        `${description.identifier}: Has part of movement but no specific navigation component was found such as: 'minecraft:navigation.generic'`,
        undefined,
        DiagnosticSeverity.Error
      ).code = "entity.movement";
    if (hasBaseMovement == 0)
      Builder.Add(`${description.identifier}: Has part of movement but not the required: 'minecraft:movement'`, undefined, DiagnosticSeverity.Error).code = "entity.movement";
  }
}
