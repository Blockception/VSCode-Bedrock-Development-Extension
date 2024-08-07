import { Languages } from "@blockception/shared";
import { Context } from "../context/context";
import { CompletionContext } from "./context";

import * as Json from "./minecraft/json/document";
import * as Language from "./minecraft/language/language";
import * as Mcfunction from "./minecraft/mcfunctions/mcfunctions";
import * as MCProject from "./minecraft/mcproject/mcproject";
import * as Molang from "./minecraft/molang/main";

export function onCompletionRequest(context: Context<CompletionContext>) {
  switch (context.document.languageId) {
    case Languages.McLanguageIdentifier:
      return Language.provideCompletion(context);

    case Languages.McFunctionIdentifier:
      return Mcfunction.provideCompletion(context);

    case Languages.McProjectIdentifier:
      return MCProject.provideCompletion(context);

    case Languages.McMolangIdentifier:
      return Molang.provideDocCompletion(context);

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      return Json.provideCompletionDocument(context);
  }
}
