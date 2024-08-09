import { FileBuilder } from "../files/file-builder";
import { Fs, Vscode } from "../util";
import { FunctionContext, TemplateFunctions } from "./functions";
import { TemplateFallback } from "./data";

import path from "path";
import * as fs from "fs";
import { IExtensionContext } from "../lsp/extension/context";

export class TemplateProcessor {
  protected _filename: string;
  protected _content: string;
  private _context: IExtensionContext;
  public processor: TemplateFunctions;

  constructor(
    context: IExtensionContext,
    filename: string,
    content: string,
    templateId: string,
    folder: string,
    attributes: Record<string, string>
  ) {
    this._content = content;
    this._context = context;
    this._filename = filename;

    const fcontext: FunctionContext = {
      filename: filename,
      folder: folder,
      attributes: attributes,
      pack: this._context.database.ProjectData.get(folder)?.folder || "",
      templateID: templateId,
    };

    this.processor = new TemplateFunctions(fcontext, context);
  }

  /**
   *
   * @returns
   */
  public async createFile(): Promise<void> {
    const fileBuilder = new FileBuilder(this._context.connection, this._context.logger);
    const filepath = Vscode.join(this.processor._fcontent.folder, this._filename);

    fileBuilder.create(filepath, this._content);

    return fileBuilder.send();
  }

  public process(): void {
    this._filename = this.processor.process(this._filename);
    this._content = this.processor.process(this._content);
  }
}

const errorFallback = {
  filename: () => {
    throw new Error("No fallback filename provided");
  },
  content: () => {
    throw new Error("No fallback content provided");
  },
};

/**
 *
 */
export namespace TemplateProcessor {
  /**
   *
   * @param template
   * @param folder
   * @param fallback
   * @returns
   */
  export function create(
    context: IExtensionContext,
    template: string,
    folder: string,
    attributes: Record<string, string> = {},
    fallback?: TemplateFallback
  ): TemplateProcessor {
    fallback = fallback || errorFallback;
    const ws = context.database.WorkspaceData.getFolder(folder);
    if (ws === undefined) {
      throw new Error("No workspace found");
    }

    const project = context.database.WorkspaceData.getProject(ws, context.settings);
    const attr = template.replace("-", ".");
    const filename = project.attributes[`template.${attr}.filename`] || fallback.filename();
    const file = project.attributes[`template.${attr}.file`];
    let content = undefined;

    if (file) {
      const filepath = path.resolve(Fs.FromVscode(ws), file);
      if (fs.existsSync(filepath)) {
        content = fs.readFileSync(file, "utf8");
      }
    }

    if (content === undefined || content === "") {
      content = fallback.content();
    }

    return new TemplateProcessor(context, filename, content, template, folder, attributes);
  }
}
