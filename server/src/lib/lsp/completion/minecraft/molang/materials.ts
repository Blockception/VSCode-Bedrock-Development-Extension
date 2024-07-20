import { PackType } from "bc-minecraft-bedrock-project";
import { ResourcePack, BehaviorPack } from "bc-minecraft-bedrock-project";
import { Vanilla } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../lsp/database/database";
import { Kinds } from "../../../../constants/kinds";
import * as Models from "../resource-pack/models";
import { Identifiable } from 'bc-minecraft-bedrock-types/lib/src/types';

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const packType = PackType.detect(context.doc.uri);

  switch (packType) {
    case PackType.behavior_pack:
      return provideBehaviorpackCompletion(context);

    case PackType.resource_pack:
      return provideResourcepackCompletion(context);
  }
}

export function provideResourcepackCompletion(context: SimpleContext<CompletionBuilder>): void {
  const fileType = ResourcePack.FileType.detect(context.doc.uri);
  const receiver = context.receiver;
  const kind = Kinds.Completion.Models;

  switch (fileType) {
    case ResourcePack.FileType.item:
    case ResourcePack.FileType.entity:
    case ResourcePack.FileType.attachable:
      //Using model geometries
      Models.provideCompletion(context);
      break;

    default:
    case ResourcePack.FileType.animation:
    case ResourcePack.FileType.animation_controller:
    case ResourcePack.FileType.render_controller:
      //Using defined geometries
      Database.ProjectData.ResourcePacks.entities.forEach((entity) => {
        const gen = (item: string) => `The defined material: ${item}\nDeclared by: ${entity.id}`;
        receiver.generate(entity.molang.materials.defined, gen, kind);
      });
      break;
  }
}

export function provideBehaviorpackCompletion(context: SimpleContext<CompletionBuilder>): void {
  const fileType = BehaviorPack.FileType.detect(context.doc.uri);
  const receiver = context.receiver;
  const kind = Kinds.Completion.Models;

  switch (fileType) {
    case BehaviorPack.FileType.block:
    case BehaviorPack.FileType.item:
    case BehaviorPack.FileType.entity:
      //Using model geometries
      const gen = (item: ResourcePack.Material.Material) => `The material: ${item}\nDeclared in: ${item.location.uri}`;
      receiver.generate(Database.ProjectData.ResourcePacks.materials, gen, kind);
      receiver.generate(Vanilla.ResourcePack.Materials, (item) => `The vanilla geometry: ${item}`, kind);
      break;
  }
}
