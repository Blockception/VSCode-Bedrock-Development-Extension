const { v4: uuid } = require("uuid");

import * as path from "path";
import { World } from '../../../Data/Templates/include';
import { TemplateBuilder } from "../Builder";
import { context } from "../Context";

export function create_manifest_file(context: context, Builder: TemplateBuilder): void {
  const uri = path.join(context.WorldFolder(), "manifest.json");
  const UUID1 = uuid();
  const UUID2 = uuid();
  Builder.CreateFile(uri, World.create_manifest(UUID1, UUID2));
}
