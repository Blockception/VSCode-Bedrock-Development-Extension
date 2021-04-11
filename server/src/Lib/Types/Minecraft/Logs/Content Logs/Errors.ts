import { DetectGeneralDataType } from "../../Format/Detection";
import { GeneralDataType } from "../../Format/General Data Type";
import { ContentLogHeader } from "./Header";

export interface ContentError {
  Header: ContentLogHeader;
  Filepath: string;
  Suberrors: ContentLogHeader[];
  Type: GeneralDataType;
}

export function FindFilepath(error: ContentError): string {
  let msg = error.Header.Message;

  let FunctionMatch = msg.match(/functions.*\.mcfunction/);

  if (FunctionMatch) {
    return FunctionMatch[0];
  }

  FunctionMatch = msg.match(/Function ([\w\/]+) failed/);

  if (FunctionMatch) {
    return "functions/" + FunctionMatch[1];
  }

  let WorldMatch = msg.match(/.:.*minecraftWorlds.*json/);

  if (WorldMatch) {
    return WorldMatch[0];
  }
  return "unknown";
}

export function CreateErrors(Headers: ContentLogHeader[]): ContentError[] {
  let Errors: ContentError[] = [];
  let Current: ContentError | undefined;

  for (let I = 0; I < Headers.length; I++) {
    let H = Headers[I];

    if (H.Message.includes("Error on line")) {
      if (Current != undefined) {
        Current.Suberrors.push(H);
      }
    } else {
      Current = {
        Filepath: "",
        Header: H,
        Suberrors: [],
        Type: GeneralDataType.unknown,
      };

      Current.Filepath = FindFilepath(Current);
      Current.Type = DetectGeneralDataType(Current.Filepath);
      TrimFilepath(Current);
      Errors.push(Current);
    }
  }

  return Errors;
}

function TrimFilepath(Error: ContentError): void {
  if (TrimItemFilepath(Error, "resource_pack", 15)) return;
  if (TrimItemFilepath(Error, "behavior_packs", 15)) return;

  if (TrimItemFilepath(Error, "bp")) return;
  if (TrimItemFilepath(Error, "BP")) return;

  if (TrimItemFilepath(Error, "rp")) return;
  if (TrimItemFilepath(Error, "RP")) return;
}

function TrimItemFilepath(Error: ContentError, pattern: string, offset: number | undefined = undefined): boolean {
  if (offset == undefined) offset = pattern.length;

  let Filepath = Error.Filepath;
  let Index = Filepath.indexOf(pattern);

  if (Index > -1) {
    let Temp = Filepath.indexOf("/", offset);

    if (Temp > -1) {
      Error.Filepath = Filepath.slice(Temp, Filepath.length);
      return true;
    }
  }

  return false;
}
