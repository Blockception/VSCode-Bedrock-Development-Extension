import { ProjectData } from "bc-minecraft-bedrock-project";
import { TextDocument } from "../lsp/documents/text-document";
import { IExtendedLogger } from "../lsp/logger/logger";

/**
 * A context object to pass around
 */
export interface SimpleContext<T> {
  /** A logger made by a service */
  readonly logger: IExtendedLogger;
  /** The document that triggered the action */
  readonly doc: TextDocument;
  /** The builder accosicated to the request */
  readonly builder: T;
  /** Where the cursor is in the object */
  readonly cursor: number;
  /** The project data reference */
  readonly projectData: ProjectData;
}

/***
 *
 */
export namespace SimpleContext {
  /**
   *
   * @param doc
   * @param builder
   * @param cursor
   * @returns
   */
  export function create<T>(
    doc: TextDocument,
    builder: T,
    cursor: number,
    projectData: ProjectData,
    logger: IExtendedLogger
  ): SimpleContext<T> {
    return { doc, builder, cursor, projectData, logger };
  }
}
