import {
  BulkRegistration,
  DidChangeConfigurationNotification,
  DocumentFormattingRequest,
  SemanticTokensRegistrationType,
} from "vscode-languageserver";
import { Languages } from "@blockception/shared";
import { Manager } from "../../Manager/Manager";
import { SemanticModifiers, SemanticTokens } from "../../Semantics/Legend";

export function SetDynamicEvents() {
  const client = Manager.Connection.client;

  if (Manager.Capabilities.hasConfigurationCapability) {
    // Register for all configuration changes.
    Manager.Connection.client.register(DidChangeConfigurationNotification.type);
  }

  const register = BulkRegistration.create();

  // Tell the client that this server supports code formatting.
  register.add(DocumentFormattingRequest.type, {
    documentSelector: [
      { scheme: "file", language: Languages.McFunctionIdentifier },
      { scheme: "file", language: Languages.McLanguageIdentifier },
    ],
  });

  // Tell the client that this server supports semantic tokens
  register.add(SemanticTokensRegistrationType.type, {
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
    full: true,
  });

  return client.register(register);
}
