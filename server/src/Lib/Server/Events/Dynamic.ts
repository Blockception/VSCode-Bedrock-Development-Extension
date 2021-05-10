import {
  DidChangeConfigurationNotification,
  DocumentFormattingRegistrationOptions,
  DocumentFormattingRequest,
  SemanticTokensRegistrationOptions,
  SemanticTokensRegistrationType,
} from "vscode-languageserver";
import { Languages } from "../../Constants";
import { Manager } from "../../Manager/Manager";
import { SemanticModifiers, SemanticTokens } from "../../Semantics/Legend";

export function SetDynamicEvents() {
  let client = Manager.Connection.client;

  if (Manager.Capabiltities.hasConfigurationCapability) {
    // Register for all configuration changes.
    Manager.Connection.client.register(DidChangeConfigurationNotification.type);
  }

  // Tell the client that this server supports code formatting.
  const Formatoptions: DocumentFormattingRegistrationOptions = {
    documentSelector: [Languages.McFunctionIdentifier, Languages.McLanguageIdentifier],
  };

  client.register(DocumentFormattingRequest.type, Formatoptions);

  // Tell the client that this server supports semantic tokens
  const registrationOptions: SemanticTokensRegistrationOptions = {
    documentSelector: [Languages.JsonCIdentifier, Languages.JsonIdentifier, Languages.McFunctionIdentifier, Languages.McLanguageIdentifier, Languages.McOtherIdentifier],
    legend: {
      tokenModifiers: SemanticModifiers,
      tokenTypes: SemanticTokens,
    },
    range: true,
    full: true,
  };
  client.register(SemanticTokensRegistrationType.type, registrationOptions);
}
