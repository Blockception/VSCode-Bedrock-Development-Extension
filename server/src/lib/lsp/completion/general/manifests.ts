import { CompletionItemKind } from "vscode-languageserver-types";
import { Context } from "../../context/context";
import { JsonPathCompletion } from "../builder";
import { CompletionContext } from "../context";

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return manifestJsonPaths.onCompletion(context);
}

const manifestJsonPaths = new JsonPathCompletion({
  match: "uuid",
  onCompletion: packUUIDS,
});

function packUUIDS(context: Context<CompletionContext>) {
  const packs = context.database.getPacks();

  packs.forEach((p) => {
    if (p.manifest.header?.uuid) return;

    context.builder.add({
      label: p.manifest.header.name,
      documentation: `Dependency on: ${p.manifest.header.description}\n\rversion: ${JSON.stringify(p.manifest.header.version)}`,
      kind: CompletionItemKind.Module,
    });
  });
}
