import { PackType } from "bc-minecraft-bedrock-project";
import { MCProject } from "bc-minecraft-project";
import { randomUUID } from "crypto";
import path from "path";
import { ToolIdentification } from "../Constants";
import { Database } from "../Database";
import { Version } from "../Version";

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

  public getAttribute(attr: string): string {
    return this._context.attributes[attr] || "";
  }

  public data: Record<string, ReplaceFunction> = {
    filename: () => this._context.filename,
    filepath: () => path.join(this._context.folder, this._context.filename),

    folder: () => this._context.folder,

    id: () => this.getAttribute("id"),
    "id.safe": () => SafeID(this.getAttribute("id")),
    "id.safe.nonamespace": () => SafeIDNoNamespace(this.getAttribute("id")),

    pack: () => this._context.pack,
    "pack.type": () => PackType.toString(this.getPack()?.type),
    "pack.type.short": () => PackType.toStringShort(this.getPack()?.type),

    "project.attributes": (attribute: string) => this.getProject().attributes[attribute],

    "template.id": () => this._context.templateID,

    "time.now": () => new Date().toUTCString(),

    tool: () => ToolIdentification,
    "tool.version": () => Version,

    uuid: () => randomUUID(),
  };
}

export function SafeID(ID: string, replace: string = "_"): string {
  ID = ID.replace(/[:]/gi, replace);
  return ID;
}

export function SafeIDNoNamespace(ID: string, replace: string = "_"): string {
  ID = NoNamespace(ID);
  return SafeID(ID);
}

export function NoNamespace(id: string): string {
  let Index = id.indexOf(":");
  if (Index > 0) id = id.substring(Index + 1);

  return id;
}
