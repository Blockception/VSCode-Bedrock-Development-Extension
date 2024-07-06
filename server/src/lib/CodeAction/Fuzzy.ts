import { CodeActionBuilder } from "./Builder";
import {
  CodeAction,
  CodeActionKind,
  Diagnostic,
  TextDocumentEdit,
  TextEdit,
} from "vscode-languageserver";
import { Database } from "../Database/Database";
import { distance } from "fastest-levenshtein";

export function FuzzyMatch(builder: CodeActionBuilder, diag: Diagnostic): Promise<void> {
  const code = diag.code;

  if (typeof code !== "string") return Promise.resolve();
  if (code.includes("missing") || code.endsWith("invalid")) {
  } else return Promise.resolve();

  const id = builder.getId(diag.range);
  let max = 20;
  const items: MatchItems[] = [
    { id: "", distance: max },
    { id: "", distance: max },
    { id: "", distance: max },
    { id: "", distance: max },
    { id: "", distance: max },
  ];

  return Database.ForEach((item) => {
    if (items.findIndex((i) => i.id === item.id) > -1) return;

    const dist = distance(id, item.id);
    if (dist > max) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].distance > dist) {
        items[i] = { id: item.id, distance: dist };
        break;
      }
    }

    max = items[4].distance;
  }).then(() => {
    items
      .sort((x, y) => x.distance - y.distance)
      .forEach((m) => {
        if (m.id === "") return;
        const action: CodeAction = {
          title: "Did you mean: " + m.id,
          kind: CodeActionKind.QuickFix,
          edit: {
            documentChanges: [
              TextDocumentEdit.create({ uri: builder.doc.uri, version: builder.doc.version }, [
                TextEdit.replace(diag.range, m.id),
              ]),
            ],
          },
        };

        builder.Push(action);
      });
  });
}

interface MatchItems {
  id: string;
  distance: number;
}
