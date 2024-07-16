import { CreateFilesParams, FileCreate } from "vscode-languageserver";
import { GetDocument } from "../../../types/Document/Document";
import { Process } from "../../../process/Process";
import { Glob } from "../../../files/glob";
import { Console } from "../../../manager/console";

//Files created
export async function OnDidCreateFilesAsync(params: CreateFilesParams): Promise<void> {
  return Console.request(
    "File Created",
    Promise.all(OnDidCreateFiles(params)).then(() => {})
  );
}

function OnDidCreateFiles(params: CreateFilesParams): Promise<void>[] {
  let files = params.files;

  let Promises: Promise<void>[] = [];

  for (let I = 0; I < files.length; I++) {
    Promises.push(OnDidCreateFile(files[I]));
  }

  return Promises;
}

async function OnDidCreateFile(Item: FileCreate): Promise<void> {
  const Doc = GetDocument(Item.uri);

  if (Doc) {
    let conf = Doc.getConfiguration();

    if (conf.ignores.patterns.length == 0 || !Glob.IsMatch(Doc.uri, conf.ignores.patterns)) {
      Process(Doc);
    } else {
      Console.Log(`Ignored: ` + Doc.uri);
    }
  }
}
