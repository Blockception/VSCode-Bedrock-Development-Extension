import { BehaviorPack, Defined, ResourcePack, Using } from "bc-minecraft-bedrock-project";
import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/project/general/types";
import { DocumentLocation, Identifiable, Locatable } from "bc-minecraft-bedrock-types/lib/types";
import { MolangSet } from "bc-minecraft-molang";
import { CancellationToken, Location } from "vscode-languageserver";
import { getIdentifier } from "../../minecraft/molang";
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
    if (item.id === id) {
      this.locations.push(item);
    }

    this.inDefinedOrUsage(item, id, item.events);
    this.inDefinedOrUsage(item, id, item.families);
    this.inDefinedOrUsage(item, id, item.groups);
    this.inDefinedOrUsage(item, id, item.bones);
    this.inDefinedOrUsage(item, id, item.events);
    this.inDefinedOrUsage(item, id, item.animations);
    this.inDefinedOrUsage(item, id, item.particles);
    this.inDefinedOrUsage(item, id, item.sounds);
    this.inMolang(item, id, item.molang);
    this.inNamed(item, id, item.properties);
    this.inNamed(item, id, item.states);
  }

  inDefinedOrUsage(holder: Base, id: string, items: Partial<Defined | Using> | undefined) {
    if (this.token?.isCancellationRequested) return;

    if (this.options.defined && Defined.is(items)) this.inSet(holder, id, items.defined);
    if (this.options.usage && Using.is(items)) this.inSet(holder, id, items.using);
  }

  inSet(holder: Base, id: string, items: Set<string> | undefined) {
    if (this.token?.isCancellationRequested) return;

    items?.forEach((i) => {
      if (i === id) return this.add(holder, i);
    });
  }

  inNamed(holder: Base, id: string, items: { name: string }[] | undefined) {
    if (this.token?.isCancellationRequested) return;

    items?.filter((o) => o.name === id).forEach((o) => this.add(holder, o.name));
  }

  inMolang(holder: Base, id: string, molang: MolangSet | undefined) {
    if (this.token?.isCancellationRequested || molang === undefined) return;

    molang.using.forEach((i) => this.checkMolang(holder, id, i));
    molang.assigned.forEach((i) => this.checkMolang(holder, id, i));
    molang.functions.forEach((i) => this.checkMolang(holder, id, i));
  }

  private checkMolang(holder: Base, id: string, item: { scope: string; names: string[]; position: number }) {
    if (!id.startsWith(item.scope)) return;

    const identifier = getIdentifier(item);
    if (identifier === id) {
      this.addItem(holder, item.position, identifier.length);
    }
  }

  add(holder: Base, item: string): void {
    const doc = this.documents.get(holder.location.uri);
    if (doc === undefined) return;

    const r = DocumentLocation.toRange(item, doc, item.length);
    this.locations.push(Location.create(doc.uri, r));
  }

  addItem(holder: Base, item: DocumentLocation, length: number): void {
    const doc = this.documents.get(holder.location.uri);
    if (doc === undefined) return;

    const r = DocumentLocation.toRange(item, doc, length);
    this.locations.push(Location.create(doc.uri, r));
  }
}
