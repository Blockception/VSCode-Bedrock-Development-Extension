import { TextDocument } from "vscode-languageserver-textdocument";
import { JsonDocument } from "../../../../Code/Json/include";
import { Database } from "../../../../Database/Database";
import { DiagnosticsBuilder } from "../../../../Diagnostics/include";
import { Entity, render_controller_ref } from "../Entity/Entity";

export function ProvideDiagnose(doc: TextDocument): void {
  let Builder = new DiagnosticsBuilder(doc);
  let JDoc = new JsonDocument(doc);

  InternalDiagnose(JDoc, Builder);

  Builder.SendDiagnostics();
}

function InternalDiagnose(JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  const Entity = JDoc.CastTo<Entity>();

  if (Entity === null || Entity === undefined) return;

  const description = Entity["minecraft:client_entity"].description;

  if (description.animations) {
    for (let animation in description.animations) {
      let data = description.animations[animation];
      DiagnoseAnimOrController(data, JDoc, Builder);
    }
  }

  if (description.geometry) {
    for (let geo in description.geometry) {
      let data = description.geometry[geo];
      DiagnoseGeo(data, JDoc, Builder);
    }
  }

  if (description.render_controllers) {
    for (let rc in description.render_controllers) {
      let data = description.render_controllers[rc];
      DiagnoseRenderController(data, JDoc, Builder);
    }
  }

  if (description.textures) {
    for (let texture in description.textures) {
      let data = description.textures[texture];
      DiagnoseTexture(data, JDoc, Builder);
    }
  }
}

function DiagnoseAnimOrController(id: string, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  const Resource = Database.Data.Resourcepack;

  if (!(Resource.Animations.HasID(id) || Resource.AnimationControllers.HasID(id))) {
    Builder.Add("Cannot find animation or controller: " + id, JDoc.RangeOf(id));
  }
}

function DiagnoseGeo(id: string, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  if (!Database.Data.Resourcepack.Models.HasID(id)) {
    Builder.Add("Cannot find model: " + id, JDoc.RangeOf(id));
  }
}

function DiagnoseTexture(id: string, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  //TODO add texture code detection
}

function DiagnoseRenderController(id: render_controller_ref, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  if (typeof id !== "string") {
    id = Object.keys(id)[0];
  }

  if (!Database.Data.Resourcepack.RenderControllers.HasID(id)) {
    Builder.Add("Cannot find resource controller: " + id, JDoc.RangeOf(id));
  }
}
