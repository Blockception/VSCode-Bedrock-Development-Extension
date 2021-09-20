import { CreateFilesParams, FileCreate } from "vscode-languageserver";
import { GetDocument } from "../../../Types/Document/Document";
import { Process } from "../../../Process/Process";
import { Glob } from "../../../Glob/Glob";

//Files created
export async function OnDidCreateFilesAsync(params: CreateFilesParams): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let Promises = OnDidCreateFiles(params);

    return Promise.all(Promises);
  });
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
  return new Promise((resolve, reject) => {
    const Doc = GetDocument(Item.uri);

    if (Doc) {
      let conf = Doc.getConfiguration();

      if (conf.ignores.patterns.length == 0 || !Glob.IsMatch(Doc.uri, conf.ignores.patterns)) {
        Process(Doc);
      } else {
        console.log(`Ignored: ` + Doc.uri);
      }
    }

    resolve();
  });
}
