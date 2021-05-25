import path from "path";
import { Database } from "../../../../Database/Database";
import { DiagnosticsBuilder } from "../../../../Diagnostics/include";
import { Glob } from "../../../../Glob/Glob";
import { JsonDocument } from "../../../Document/Json Document";
import { TextDocument } from "../../../Document/TextDocument";
import { Entity, render_controller_ref } from "../Entity/Entity";
import { GetResourcePack } from "../Functions";

export function ProvideDiagnostic(doc: TextDocument): void {
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
    const RP = GetResourcePack(JDoc.doc.uri, "entity");
    const source = [path.join(RP, "textures", "*"), path.join(RP, "textures", "**/*")];
    const Files = Glob.GetFiles(Glob.EnsureSource(source));

    for (let texture in description.textures) {
      let data = description.textures[texture];
      DiagnoseTexture(data, Files, JDoc, Builder);
    }
  }
}

function DiagnoseAnimOrController(id: string, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  const Resource = Database.Data.Resourcepack;

  if (!(Resource.Animations.HasID(id) || Resource.AnimationControllers.HasID(id))) {
    //No code assignment
    Builder.Add("Cannot find animation or controller: " + id, JDoc.RangeOf(id)).code = "anim.missing";
  }
}

function DiagnoseGeo(id: string, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  if (!Database.Data.Resourcepack.Models.HasID(id)) {
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

  if (!Database.Data.Resourcepack.RenderControllers.HasID(id)) {
    Builder.Add("Cannot find resource controller: " + id, JDoc.RangeOf(id)).code = "rc.missing";
  }
}
