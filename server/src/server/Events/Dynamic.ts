import { DocumentFormattingRegistrationOptions, DocumentFormattingRequest } from "vscode-languageserver";
import { McFunctionIdentifier, McLanguageIdentifier } from "../../Constants";
import { Manager } from "../../manager/Manager";

export function SetDynamicEvents() {
  let client = Manager.Connection.client;

  // Tell the client that this server supports code formatting.
  const Formatoptions: DocumentFormattingRegistrationOptions = { documentSelector: [McFunctionIdentifier, McLanguageIdentifier] };
  client.register(DocumentFormattingRequest.type, Formatoptions);

}
