import { fstat, readdirSync } from "fs";

export function FindBedrockInstallationFolder(): string {
  switch (process.platform) {
    case "win32":
      return FindBedrockWinsInstallationFolder();
  }

  return "";
}

function FindBedrockWinsInstallationFolder(): string {
  let AppDataLocal = process.env.LOCALAPPDATA;

  if (AppDataLocal) {
    let PackageFolder = AppDataLocal + "\\Packages\\";

    var Files = readdirSync(PackageFolder);

    for (let I = 0; I < Files.length; I++) {
      if (Files[I].includes("Microsoft.MinecraftUWP")) {
        let Folder = PackageFolder + Files[I] + "\\";
        return Folder;
      }
    }
  }

  return "";
}
