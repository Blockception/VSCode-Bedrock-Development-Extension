const { v4: uuid } = require("uuid");

import * as World from "../../../Data/Templates//World/index";

import * as path from "path";
import { TemplateBuilder } from "../Builder";
import { context } from "../Context";

export function create_manifest_file(context: context, Builder: TemplateBuilder): void {
  const uri = path.join(context.WorldFolder(), "manifest.json");
  const UUID1 = uuid();
  const UUID2 = uuid();
  Builder.CreateFile(uri, World.create_manifest(UUID1, UUID2));
}
