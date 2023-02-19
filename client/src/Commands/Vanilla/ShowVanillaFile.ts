import path from "path";
import { commands, ExtensionContext, Uri, window } from "vscode";
import { Commands, GetBedrockInstallationFolder } from "@blockception/shared";
import { Glob } from "../../Glob";

export function Activate(context: ExtensionContext): void {
  context.subscriptions.push(commands.registerCommand(Commands.ShowVanillaFile, ShowVanillaFile));
}

function ShowVanillaFile(args: any) {
  const dir = path.join(GetBedrockInstallationFolder(), "data");
  const files = Glob.GetFiles(["{behavior_packs,resource_packs}/vanilla**/**/*.json"], ["behavior_trees", "contents.json"], dir);

  if (files.length === 0) {
    window.showErrorMessage("No vanilla files found");
    return;
  }

  const options: Record<string, string> = {};
  
  files.forEach((file) => {
    const key = path.basename(file);
    options[key] = file;
  });

  const keys = Object.keys(options);
  keys.sort();

  window.showQuickPick(keys).then((key) => {
    if (key) {
      let file = options[key];
      if (file) {
        const uri = Uri.file(file);

        window.showTextDocument(uri, { preview: false });
      }
    }
  });
}
