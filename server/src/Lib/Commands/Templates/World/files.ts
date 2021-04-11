import { uuid } from "uuidv4";
import * as path from "path";
import { Templates } from "../../../Data/include";
import { TemplateBuilder } from "../Builder";
import { Context } from "../Context";

export function create_manifest_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.WorldFolder, "manifest.json");
  let UUID1 = uuid();
  let UUID2 = uuid();
  Builder.CreateFile(uri, Templates.World.create_manifest(UUID1, UUID2));
}
