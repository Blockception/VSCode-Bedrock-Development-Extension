import { URI } from "vscode-uri";
import { GetDocuments } from "../Code/include";
import { JsonDocument } from "../Code/Json/include";
import { ValidationData } from "./Validation";

export function GetValidationData(workspaces: string[]): ValidationData {
  let Out: ValidationData = ValidationData.createEmpty();

  workspaces.forEach((ws) => {
    ws = URI.parse(ws).fsPath;

    if (!ws.endsWith("\\")) ws += "\\";
    ws = ws.replace(/\\/g, "/");

    GetDocuments(ws, "**/minecraft-validation.json").forEach((D) => Process(D, Out));
  });

  return Out;
}

function Process(uri: string, receiver: ValidationData): void {
  let doc = JsonDocument.GetDocument(uri);

  let data = doc.CastTo<ValidationData>();

  if (data === undefined || data === null) return;

  data.objectives?.invalid?.forEach((m) => receiver.objectives?.invalid?.push(m));
  data.objectives?.valid?.forEach((m) => receiver.objectives?.valid?.push(m));

  data.tags?.invalid?.forEach((m) => receiver.tags?.invalid?.push(m));
  data.tags?.valid?.forEach((m) => receiver.tags?.valid?.push(m));
}
