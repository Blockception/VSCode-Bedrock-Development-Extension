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
  const client = Manager.Connection.client;

  if (Manager.Capabiltities.hasConfigurationCapability) {
    // Register for all configuration changes.
    Manager.Connection.client.register(DidChangeConfigurationNotification.type);
  }

  // Tell the client that this server supports code formatting.
  const Formatoptions: DocumentFormattingRegistrationOptions = {
    documentSelector: [
      { scheme: "file", language: Languages.McFunctionIdentifier },
      { scheme: "file", language: Languages.McLanguageIdentifier },
    ],
  };

  client.register(DocumentFormattingRequest.type, Formatoptions);

  // Tell the client that this server supports semantic tokens
  const registrationOptions: SemanticTokensRegistrationOptions = {
    documentSelector: [
      { scheme: "file", language: Languages.JsonCIdentifier },
      { scheme: "file", language: Languages.JsonIdentifier },
      { scheme: "file", language: Languages.McFunctionIdentifier },
      { scheme: "file", language: Languages.McLanguageIdentifier },
      { scheme: "file", language: Languages.McOtherIdentifier },
      { scheme: "file", language: Languages.McMolangIdentifier },
    ],
    legend: {
      tokenModifiers: SemanticModifiers,
      tokenTypes: SemanticTokens,
    },
    range: true,
    full: true
  };
  client.register(SemanticTokensRegistrationType.type, registrationOptions);
}
