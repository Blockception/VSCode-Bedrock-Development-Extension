import { CompletionItemKind, SymbolKind } from "vscode-languageserver";

export namespace Kinds {
  export namespace Symbol {
    export const Block: SymbolKind = SymbolKind.Property;
    export const Boolean: SymbolKind = SymbolKind.Constant;
    export const Coordinate: SymbolKind = SymbolKind.Constant;
    export const Effect: SymbolKind = SymbolKind.Property;
    export const Entity: SymbolKind = SymbolKind.Property;
    export const Event: SymbolKind = SymbolKind.Event;
    export const FakeEntity: SymbolKind = SymbolKind.EnumMember;
    export const Family: SymbolKind = SymbolKind.EnumMember;
    export const Float: SymbolKind = SymbolKind.Constant;
    export const Functions: SymbolKind = SymbolKind.Class;
    export const Gamemode: SymbolKind = SymbolKind.Constant;
    export const Integer: SymbolKind = SymbolKind.Constant;
    export const Item: SymbolKind = SymbolKind.Property;
    export const Objectives: SymbolKind = SymbolKind.Variable;
    export const Particle: SymbolKind = SymbolKind.Property;
    export const Selector: SymbolKind = SymbolKind.TypeParameter;
    export const Sound: SymbolKind = SymbolKind.Property;
    export const Tag: SymbolKind = SymbolKind.Property;
    export const Tickingarea: SymbolKind = SymbolKind.Module;
    export const Xp: SymbolKind = SymbolKind.Constant;
  }

  export namespace Completion {
    export const AnimationControllers: CompletionItemKind = CompletionItemKind.Class;
    export const Animation: CompletionItemKind = CompletionItemKind.Function;

    export const Block: CompletionItemKind = CompletionItemKind.Property;
    export const Boolean: CompletionItemKind = CompletionItemKind.Constant;
    export const Coordinate: CompletionItemKind = CompletionItemKind.Constant;
    export const Effect: CompletionItemKind = CompletionItemKind.Property;
    export const Entity: CompletionItemKind = CompletionItemKind.Property;
    export const Event: CompletionItemKind = CompletionItemKind.Event;
    export const FakeEntity: CompletionItemKind = CompletionItemKind.EnumMember;
    export const Family: CompletionItemKind = CompletionItemKind.EnumMember;
    export const Float: CompletionItemKind = CompletionItemKind.Constant;
    export const Functions: CompletionItemKind = CompletionItemKind.Class;
    export const Gamemode: CompletionItemKind = CompletionItemKind.Constant;
    export const Integer: CompletionItemKind = CompletionItemKind.Constant;
    export const Item: CompletionItemKind = CompletionItemKind.Property;
    export const Objectives: CompletionItemKind = CompletionItemKind.Variable;
    export const Particle: CompletionItemKind = CompletionItemKind.Property;
    export const Selector: CompletionItemKind = CompletionItemKind.TypeParameter;
    export const Sound: CompletionItemKind = CompletionItemKind.Property;
    export const Tag: CompletionItemKind = CompletionItemKind.Property;
    export const Tickingarea: CompletionItemKind = CompletionItemKind.Module;
    export const Xp: CompletionItemKind = CompletionItemKind.Constant;
  }
}
