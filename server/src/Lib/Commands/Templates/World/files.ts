const { v4: uuid } = require("uuid");

import * as path from "path";
import { Templates } from "../../../Data/include";
import { TemplateBuilder } from "../Builder";
import { Context } from "../Context";

export function create_manifest_file(Context: Context, Builder: TemplateBuilder): void {
  const uri = path.join(Context.WorldFolder, "manifest.json");
  const UUID1 = uuid();
  const UUID2 = uuid();
  Builder.CreateFile(uri, Templates.World.create_manifest(UUID1, UUID2));
}
