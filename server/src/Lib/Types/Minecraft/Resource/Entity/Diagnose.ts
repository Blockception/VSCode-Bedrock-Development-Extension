import path from "path";
import { Database } from "../../../../Database/Database";
import { DiagnosticsBuilder } from "../../../../Diagnostics/include";
import { Glob } from "../../../../Glob/Glob";
import { JsonDocument } from "../../../Document/Json Document";
import { TextDocument } from "../../../Document/TextDocument";
import { Script } from "../../../General/include";
import { Entity, render_controller_ref } from "../Entity/Entity";
import { GetResourcePack } from "../Functions";

export function ProvideDiagnostic(doc: TextDocument): void {
  let Builder = new DiagnosticsBuilder(doc);
  const JDoc = new JsonDocument(doc);

  InternalDiagnose(JDoc, Builder);

  Builder.SendDiagnostics();
}

function InternalDiagnose(JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  const entity = JDoc.CastTo<Entity>();

  if (entity === null || entity === undefined || !Entity.is(entity)) return;

  const description = entity["minecraft:client_entity"].description;

  if (description.animations) {
    for (let animation in description.animations) {
      const data = description.animations[animation];
      DiagnoseAnimOrController(data, JDoc, Builder);
    }
  }

  if (description.geometry) {
    for (let geo in description.geometry) {
      const data = description.geometry[geo];
      DiagnoseGeo(data, JDoc, Builder);
    }
  }

  if (description.render_controllers) {
    for (let rc in description.render_controllers) {
      const data = description.render_controllers[rc];
      DiagnoseRenderController(data, JDoc, Builder);
    }
  }

  if (description.textures) {
    const RP = GetResourcePack(JDoc.doc.uri, "entity");
    const source = ["textures/*", "textures/**/*"];
    const Files = Glob.GetFiles(source, undefined, RP);

    for (const texture in description.textures) {
      const data = description.textures[texture];
      DiagnoseTexture(data, Files, JDoc, Builder);
    }
  }

  Script.ProvideDiagnostic(description.scripts, description.animations, JDoc, Builder);
}

function DiagnoseAnimOrController(id: string, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  const Resource = Database.ProjectData.Resourcepack;

  if (!(Resource.Animations.HasID(id) || Resource.AnimationControllers.HasID(id))) {
    //No code assignment
    Builder.Add("Cannot find animation or controller: " + id, JDoc.RangeOf(id)).code = "anim.missing";
  }
}

function DiagnoseGeo(id: string, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  if (!Database.ProjectData.Resourcepack.Models.HasID(id)) {
    Builder.Add("Cannot find model: " + id, JDoc.RangeOf(id)).code = "geo.missing";
  }
}

function DiagnoseTexture(id: string, Files: string[], JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  for (let I = 0; I < Files.length; I++) {
    if (Files[I].includes(id)) return;
  }

  Builder.Add("Cannot find texture: " + id, JDoc.RangeOf('"' + id + '"')).source = "texture.missing";
}

function DiagnoseRenderController(id: render_controller_ref, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  if (typeof id !== "string") {
    id = Object.keys(id)[0];
  }

  if (!Database.ProjectData.Resourcepack.RenderControllers.HasID(id)) {
    Builder.Add("Cannot find resource controller: " + id, JDoc.RangeOf(id)).code = "rc.missing";
  }
}
