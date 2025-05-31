/* eslint-disable @typescript-eslint/no-empty-object-type */
import { MessageDirection, ProtocolRequestType, WorkDoneProgressOptions } from "vscode-languageserver-protocol";
import { BehaviorPack, PackCollection, ResourcePack } from "bc-minecraft-bedrock-project";

type bpTypes = Exclude<
  keyof BehaviorPack.BehaviorPackCollection,
  keyof PackCollection<BehaviorPack.BehaviorPack> | "add"
>;
type rpTypes = Exclude<
  keyof ResourcePack.ResourcePackCollection,
  keyof PackCollection<ResourcePack.ResourcePack> | "add"
>;

export interface DatabaseParams {
  /**
   * The type to check
   */
  type: `bp.${bpTypes}` | `rp.${rpTypes}`;
  /**
   * The regex to execute on all the ids
   */
  filter?: string;
  /**
   * The regex flags to pass to the regex builder
   */
  flags?: string;
}

export namespace DatabaseParams {
  export function splitType(params: DatabaseParams): ["bp", bpTypes] | ["rp", rpTypes] | null {
    const v = params?.type;
    if (typeof v !== "string") return null;

    const index = v.indexOf(".");
    if (index < 0) {
      return null;
    }

    const t = v.slice(0, index);
    const subt = v.slice(index + 1);

    return [t, subt] as any; // As any I know, but it works :D
  }
}

export interface DatabaseQueryRegistrationOptions extends WorkDoneProgressOptions {}

export namespace DatabaseQueryRequest {
  export const method = "bcmc/database/ids";
  export const messageDirection: MessageDirection = MessageDirection.clientToServer;
  export const type = new ProtocolRequestType<
    DatabaseParams,
    string[] | null,
    never,
    void,
    DatabaseQueryRegistrationOptions
  >(method);
}
