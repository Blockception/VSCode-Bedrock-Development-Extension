import { LocationWord } from "bc-vscode-words";
import { Database } from "../../../Database/include";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";

export function ProvideDiagnostic(event: LocationWord, builder: DiagnosticsBuilder, EntityID: string | undefined = undefined): void {
  let eventData = event.text;

  if (EntityID) {
    let Entity = Database.ProjectData.General.Entities.GetFromID(EntityID);

    if (Entity) {
      if (!Entity.Events.includes(eventData)) {
        builder.AddWord(event, `Cannot find event: '${eventData}' in entity: '${Entity.Identifier}'`);
      }
    }
  }

  let Found = false;

  Database.ProjectData.General.Entities.ForEach((entity) => {
    if (!Found && entity.Events.includes(eventData)) {
      Found = true;
    }
  });

  if (!Found) builder.AddWord(event, `Cannot find event: '${eventData}'`).code = "event.missing";
}
