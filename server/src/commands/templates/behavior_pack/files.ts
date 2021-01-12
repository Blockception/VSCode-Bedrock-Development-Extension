/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
	 list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
	 this list of conditions and the following disclaimer in the documentation
	 and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
	 contributors may be used to endorse or promote products derived from
	 this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import { Templates } from "../../../data/include";
import { SafeID, SafeIDNoNamespace } from "../../../data/Templates/Function";
import { TemplateBuilder } from "../Builder";
import * as path from "path";
import { Context } from "../Context";
import { uuid } from "uuidv4";

export function create_animation_controller_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "animation_controllers", safeID + ".controller.json");
  Builder.CreateFile(uri, Templates.behavior_pack.create_animation_controller(ID));
}

export function create_animation_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "animations", safeID + ".animation.json");
  Builder.CreateFile(uri, Templates.behavior_pack.create_animation(ID));
}

export function create_block_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "blocks", safeID + ".block.json");
  Builder.CreateFile(uri, Templates.behavior_pack.create_block(ID));
}

export function create_entity_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "entities", safeID + ".entity.json");
  Builder.CreateFile(uri, Templates.behavior_pack.create_entity(ID));
}

export function create_item_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "items", safeID + ".item.json");
  Builder.CreateFile(uri, Templates.behavior_pack.create_item(ID));
}

export function create_loot_table_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "loot_tables", safeID + ".loot.json");
  Builder.CreateFile(uri, Templates.behavior_pack.create_loot_table());
}

export function create_manifest_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.BehaviorPack, "manifest.json");
  let UUID1 = uuid();
  let UUID2 = uuid();
  Builder.CreateFile(uri, Templates.behavior_pack.create_manifest(UUID1, UUID2));
}

export function create_recipe_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "recipes", safeID + ".json");
  Builder.CreateFile(uri, Templates.behavior_pack.create_recipe(ID));
}

export function create_spawn_rule_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "spawn_rules", safeID + ".json");
  Builder.CreateFile(uri, Templates.behavior_pack.create_spawn_rule(ID));
}

export function create_trading_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "trading", safeID + ".trades.json");
  Builder.CreateFile(uri, Templates.behavior_pack.create_trading(ID));
}
