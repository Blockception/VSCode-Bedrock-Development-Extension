import { ClientCapabilities } from 'vscode-languageserver';

export interface ExtensionCapabilities {
  client: {
    configuration: boolean;
    diagnostics: boolean;
    workspace: boolean;
  },
  server: {
    completion: boolean;
  }
}

export namespace ExtensionCapabilities {
  export function empty(): ExtensionCapabilities {
    return {
      client: {
        configuration: false,
        diagnostics: false,
        workspace: false,
      },
      server: {
        completion: false,
      }
    }
  }

  export function parseCapabilities(receiver: ExtensionCapabilities, capabilities: ClientCapabilities): void {
    // Does the client support the `workspace/configuration` request?
    // If not, we fall back using global settings.
    receiver.client.configuration = !!(capabilities.workspace && !!capabilities.workspace.configuration);
    receiver.client.workspace  = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
    receiver.client.diagnostics = !!(
      capabilities.textDocument &&
      capabilities.textDocument.publishDiagnostics &&
      capabilities.textDocument.publishDiagnostics.relatedInformation
    );
  }
}