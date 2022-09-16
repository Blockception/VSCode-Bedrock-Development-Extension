import { PackType } from "bc-minecraft-bedrock-project";
import { MCProject } from "bc-minecraft-project";
import path from "path";
import { Database } from "../Database";

type ReplaceFunction = (...args: any[]) => string;

export interface FunctionContext {
  filename: string;
  folder: string;
  templateID: string;
  pack: string;

  attributes: Record<string, string>;
}

export class TemplateFunctions {
  public _context: FunctionContext;

  constructor(context: FunctionContext) {
    this._context = context;
  }

  get(attribute: keyof typeof this.data): ReplaceFunction | undefined {
    const callbackfn = this.data[attribute];

    if (typeof callbackfn === "function") {
      return callbackfn.bind(this) as any;
    }

    return undefined;
  }

  process(template: string): string {
    return template.replace(/\$\{\{(.*)\}\}/gim, (sub: string, ...args: any[]) => {
      const fn = this.get(sub);

      return fn ? fn(...args) : "";
    });
  }

  public getPack() {
    return Database.ProjectData.get(this._context.pack);
  }

  public getProject(): MCProject {
    return this.getPack()?.context || MCProject.createEmpty();
  }

  public data: Record<string, ReplaceFunction> = {
    filename: () => this._context.filename,
    folder: () => this._context.folder,
    filepath: () => path.join(this._context.folder, this._context.filename),
    id: () => this._context.attributes["id"] || "",

    "template.id": () => this._context.templateID,

    pack: () => this._context.pack,
    "pack.type": () => PackType.toString(this.getPack()?.type),
    "pack.type.short": () => PackType.toStringShort(this.getPack()?.type),

    "time.now": () => new Date().toUTCString(),

    "project.attributes": (attribute: string) => this.getProject().attributes[attribute],
  };
}
