import { LocationWord } from "bc-vscode-words";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Database } from "../Database/Database";
import { DiagnosticsBuilder } from "../Diagnostics/Builder";
import { Molang } from "../include";
import { ProcessWord } from "../Types/Commands/include";
import { DiagnoseLine } from "../Types/Minecraft/Behavior/Functions/include";
import { DetectGeneralDataType, GeneralDataType } from "../Types/Minecraft/Format/include";
import { Behavior, Resource } from "../Types/Minecraft/include";
import { GetValidationData, ValidationData } from "../Validation/include";

export function ProcessJson(doc: TextDocument): void {
  Database.Data.DeleteFile(doc.uri);
  let Type = DetectGeneralDataType(doc.uri);

  switch (Type) {
    case GeneralDataType.unknown:
      return;

    case GeneralDataType.behaviour_pack:
      Behavior.Process(doc);
      break;

    case GeneralDataType.resource_pack:
      Resource.Process(doc);
      break;
  }

  let Data = Molang.Files.DataCollector.Parse(doc);

  if (Data.Command.length > 0) {
    let Builder = new DiagnosticsBuilder(doc);
    Data.Command.forEach((w) => ProcessJsonCommand(w, doc, Builder));
    //Builder.SendDiagnostics();
  }
}

function ProcessJsonCommand(word: LocationWord, doc: TextDocument, Builder: DiagnosticsBuilder) {
  //Process contents
  ProcessWord(word, doc);
  /*
  let start = word.location.range.start;

  let Data = Database.MinecraftProgramData.GetProjecData();
  let validation: ValidationData | undefined;

  if (Data) {
    validation = GetValidationData(Data.Workspaces);
  } else {
    validation = ValidationData.createEmpty();
  }

  DiagnoseLine(word.text, start, start, validation, Builder);*/
}
