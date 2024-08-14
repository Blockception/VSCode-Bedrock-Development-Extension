import { BehaviorPack, ResourcePack } from "bc-minecraft-bedrock-project";
import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { DocumentLocation, Identifiable, Locatable } from "bc-minecraft-bedrock-types/lib/src/types";
import { Defined, Using } from "bc-minecraft-molang";
import { MolangFullSet, MolangSetOptional } from "bc-minecraft-molang/lib/src/Molang";
import { CancellationToken } from "vscode-languageserver-protocol";
import { Location } from "vscode-languageserver-types";
import { IDocumentManager } from "../documents/manager";

type Base = Identifiable & Locatable;
type Carriers = Base & Partial<Items>;
type Items = BehaviorPack.Animation.Animation &
  BehaviorPack.AnimationController.AnimationController &
  BehaviorPack.Block.Block &
  BehaviorPack.Entity.Entity &
  BehaviorPack.Item.Item &
  BehaviorPack.LootTable.LootTable &
  BehaviorPack.McFunction.Function &
  BehaviorPack.Structure.Structure &
  BehaviorPack.Trading.Trading &
  ResourcePack.Animation.Animation &
  ResourcePack.AnimationController.AnimationController &
  ResourcePack.Attachable.Attachable &
  ResourcePack.Block.Block &
  ResourcePack.Entity.Entity &
  ResourcePack.Fog.Fog &
  ResourcePack.Material.Material &
  ResourcePack.Model.Model &
  ResourcePack.Particle.Particle &
  ResourcePack.RenderController.RenderController &
  ResourcePack.Sound.Sound &
  ResourcePack.Texture.Texture &
  GeneralInfo;

export interface Options {
  defined: boolean;
  usage: boolean;
}

export class ReferenceBuilder {
  public locations: (Base | Location | undefined)[];
  public documents: IDocumentManager;
  public options: Options;
  public token: CancellationToken | undefined;

  constructor(documents: IDocumentManager, options: Options, token?: CancellationToken) {
    this.locations = [];
    this.documents = documents;
    this.options = options;
    this.token = token;
  }

  findReference<T extends Carriers>(item: T, id: string) {
    console.log(item.id);
    if (item.id === id) {
      this.locations.push(item);
    }

    this.inArrays(item, id, item.events);
    this.inArrays(item, id, item.families);
    this.inArrays(item, id, item.groups);
    this.inArrays(item, id, item.bones);
    this.inArrays(item, id, item.events);
    this.inDefinedOrUsage(item, id, item.animations);
    this.inDefinedOrUsage(item, id, item.particles);
    this.inDefinedOrUsage(item, id, item.sounds);
    this.inMolang(item, id, item.molang);
    this.inNamed(item, id, item.properties);
    this.inNamed(item, id, item.states);
  }

  inDefinedOrUsage(holder: Base, id: string, items: Partial<Defined<string> | Using<string>> | undefined) {
    if (this.token?.isCancellationRequested) return;

    if (this.options.defined && Defined.is<string>(items)) this.inArrays(holder, id, items.defined);
    if (this.options.usage && Using.is<string>(items)) this.inArrays(holder, id, items.using);
  }

  inArrays(holder: Base, id: string, items: string[] | undefined) {
    if (this.token?.isCancellationRequested) return;

    items?.forEach((i) => {
      if (i === id) return this.add(holder, i);
    });
  }

  inNamed(holder: Base, id: string, items: { name: string }[] | undefined) {
    if (this.token?.isCancellationRequested) return;

    items?.forEach((o) => {
      if (o.name === id) return this.add(holder, o.name);
    });
  }

  inMolang(holder: Base, id: string, molang: MolangSetOptional | undefined) {
    if (this.token?.isCancellationRequested || molang === undefined) return;
    const upped = MolangFullSet.upgrade(molang);

    this.inDefinedOrUsage(holder, id, upped.contexts);
    this.inDefinedOrUsage(holder, id, upped.geometries);
    this.inDefinedOrUsage(holder, id, upped.materials);
    this.inDefinedOrUsage(holder, id, upped.queries);
    this.inDefinedOrUsage(holder, id, upped.temps);
    this.inDefinedOrUsage(holder, id, upped.textures);
    this.inDefinedOrUsage(holder, id, upped.variables);
  }

  add(holder: Base, item: string): void {
    const doc = this.documents.get(holder.location.uri);
    if (doc === undefined) return;

    const r = DocumentLocation.ToRange(item, doc, item.length);
    this.locations.push(Location.create(doc.uri, r));
  }
}
