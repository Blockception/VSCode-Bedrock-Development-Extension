import {
  BulkRegistration,
  DidChangeConfigurationNotification,
  DocumentFormattingRequest,
  SemanticTokensRegistrationType,
} from "vscode-languageserver";
import { Languages } from "@blockception/shared";
import { Manager } from "../../../manager/manager";
import { SemanticModifiers, SemanticTokens } from "../../semantics/constants";

export function SetDynamicEvents(register: BulkRegistration) {
  if (Manager.Capabilities.hasConfigurationCapability) {
    // Register for all configuration changes.
    Manager.Connection.client.register(DidChangeConfigurationNotification.type);
  }



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
}
