import { BehaviorPack } from "bc-minecraft-bedrock-project";
import { DocumentLocation, Identifiable, Locatable } from "bc-minecraft-bedrock-types/lib/src/types";
import { Location } from "vscode-languageserver-types";
import { References } from "../../util";
import { IDocumentManager } from "../documents/manager";
import { Defined, Using } from "bc-minecraft-molang";
import { CancellationToken } from "vscode-languageserver-protocol";
import { MolangFullSet, MolangSetOptional } from "bc-minecraft-molang/lib/src/Molang";

type Base = Identifiable & Locatable;
type Carriers = Base & Partial<Items>;
type Items = BehaviorPack.Animation.Animation & BehaviorPack.Entity.Entity;

interface Options {
  defined: boolean;
  usage: boolean;
}

export class ReferenceBuilder {
  public locations: (Base | Location | undefined)[];
  public documents: IDocumentManager;
  public options: Options;
  public token: CancellationToken;

  constructor(documents: IDocumentManager, options: Options, token: CancellationToken) {
    this.locations = [];
    this.documents = documents;
    this.options = options;
    this.token = token;
  }

  findReference<T extends Carriers>(item: T, id: string) {
    if (item.id === id) {
      this.locations.push(item);
    }

    this.inDefinedOrUsage(item, id, item.animations);
    this.inArrays(item, id, item.events);
    this.inArrays(item, id, item.families);
    this.inArrays(item, id, item.groups);
    this.inNamed(item, id, item.properties);
    this.inMolang(item, id, item.molang);

    return References.convertLocation(this.locations, this.documents);
  }

  inDefinedOrUsage(holder: Base, id: string, items: Partial<Defined<string> | Using<string>> | undefined) {
    if (this.token.isCancellationRequested) return;

    if (this.options.defined && Defined.is<string>(items)) this.inArrays(holder, id, items.defined);
    if (this.options.usage && Using.is<string>(items)) this.inArrays(holder, id, items.using);
  }

  inArrays(holder: Base, id: string, items: string[] | undefined) {
    if (this.token.isCancellationRequested) return;

    items?.forEach((i) => {
      if (i === id) return this.add(holder, i);
    });
  }

  inNamed(holder: Base, id: string, items: { name: string }[] | undefined) {
    if (this.token.isCancellationRequested) return;

    items?.forEach((o) => {
      if (o.name === id) return this.add(holder, o.name);
    });
  }

  inMolang(holder: Base, id: string, molang: MolangSetOptional | undefined) {
    if (this.token.isCancellationRequested || molang === undefined) return;
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

    DocumentLocation.ToRange(item, doc, item.length);
  }
}
