import { PackType } from "bc-minecraft-bedrock-project";
import { MCProject } from "bc-minecraft-project";
import { randomUUID } from "crypto";
import { ToolIdentification } from "@blockception/shared";
import { Fs, Vscode } from "../util";
import { Version } from "../constants";
import { IExtensionContext } from "../lsp/extension";

type ReplaceFunction = (...args: any[]) => string;

export interface FunctionContext {
  filename: string;
  folder: string;
  templateID: string;
  pack: string;

  attributes: Record<string, string>;
}

export class TemplateFunctions {
  public _fcontent: FunctionContext;
  public _context: IExtensionContext;

  constructor(fcontent: FunctionContext, context: IExtensionContext) {
    this._fcontent = fcontent;
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
    return template.replace(/\$\{{([^{}]*)}}/gim, (sub: string, ...args: any[]) => {
      const command = (args[0] as string).trim();

      let parts = command.split(":");
      if (parts.length > 0) {
        sub = parts[0];
        parts = parts.slice(1).map((item) => item.trim());
      }

      const fn = this.get(sub);

      return fn ? fn(...parts) : "";
    });
  }

  getPack() {
    return this._context.database.ProjectData.get(this._fcontent.pack);
  }

  getProject(): MCProject {
    return this.getPack()?.context || MCProject.createEmpty();
  }

  getAttribute(attr: string): string {
    return this._fcontent.attributes[attr] || "";
  }

  public data: Record<string, ReplaceFunction> = {
    filename: () => this._fcontent.filename,
    filepath: () => Fs.FromVscode(Vscode.join(this._fcontent.folder, this._fcontent.filename)),

    folder: () => Fs.FromVscode(this._fcontent.folder),

    id: () => this.getAttribute("id"),
    "id.safe": () => safeID(this.getAttribute("id")),
    "id.safe.nonamespace": () => safeIDWithoutNamespace(this.getAttribute("id")),

    pack: () => this._fcontent.pack,
    "pack.type": () => PackType.toString(this.getPack()?.type),
    "pack.type.short": () => PackType.toStringShort(this.getPack()?.type),

    "project.attributes": (attribute: string) => this.getProject().attributes[attribute],

    "template.id": () => this._fcontent.templateID,

    "time.now": () => new Date().toUTCString(),

    tool: () => ToolIdentification,
    "tool.version": () => Version,

    uuid: () => randomUUID(),
  };
}

export function safeID(ID: string, replace: string = "_"): string {
  ID = ID.replace(/[:]/gi, replace);
  return ID;
}

export function safeIDWithoutNamespace(ID: string, replace: string = "_"): string {
  ID = WithoutNamespace(ID);
  return safeID(ID, replace);
}

export function WithoutNamespace(id: string): string {
  const Index = id.indexOf(":");
  if (Index > 0) id = id.substring(Index + 1);

  return id;
}
