import { CompletionItem } from "vscode-languageserver";
import { ModeCollection } from "../../../Commands/Modes/Interface";
import { Kinds } from "../../Kinds";

export const SelectorBaseMode: ModeCollection = {
  Name: "selector base mode",
  Modes: [
    { Name: "@a", Description: "Targets all players" },
    { Name: "@e", Description: "Targets all entities" },
    { Name: "@s", Description: "Targets the executing entity" },
    { Name: "@r", Description: "Targets random players, or if specified, random types" },
    { Name: "@p", Description: "Targets the nearest player" },
  ],
};

export namespace SelectorBase {
  export namespace Completion {
    export const AllPlayer: CompletionItem = { label: "@a", kind: Kinds.Completion.Selector, documentation: "Targets all players" };
    export const AllEntities: CompletionItem = { label: "@e", kind: Kinds.Completion.Selector, documentation: "Targets all entities" };
    export const Executing: CompletionItem = { label: "@s", kind: Kinds.Completion.Selector, documentation: "Targets the executing entity" };
    export const Random: CompletionItem = { label: "@r", kind: Kinds.Completion.Selector, documentation: "Targets random players, or if specified, random types" };
    export const NearestPlayer: CompletionItem = { label: "@p", kind: Kinds.Completion.Selector, documentation: "Targets the nearest player" };
    export const MyAgent: CompletionItem = { label: "@c", kind: Kinds.Completion.Selector, documentation: "Targets the executing players agent" };
    export const SomethingEdu: CompletionItem = { label: "@v", kind: Kinds.Completion.Selector, documentation: "Targets all agents" };
    export const Initiator: CompletionItem = { label: "@initiator", kind: Kinds.Completion.Selector, documentation: "Target the initiating entity" };
  }
}
