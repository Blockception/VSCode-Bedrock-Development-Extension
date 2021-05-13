import { CompletionBuilder } from "../../../Completion/include";
import { TextDocument } from "../../Document/include";
import { DataType } from "../Format/Data Type";
import { DetectResourceType } from "../Format/Detection";
import { Entity, Sounds_Definitions } from "./include";

export function ProvideCompletion(doc: TextDocument, cursor: number, receiver: CompletionBuilder): void {
  const uri = decodeURI(doc.uri);
  const type = DetectResourceType(uri);

  switch (type) {
    case DataType.resource_entity:
      return Entity.ProvideCompletion(doc, cursor, receiver);

    case DataType.resource_sounds_definitions:
      return Sounds_Definitions.ProvideCompletion(doc, cursor, receiver);

    default:
      break;
  }
}
