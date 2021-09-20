import { CompletionItemKind, SymbolKind } from "vscode-languageserver";

export namespace Kinds {
  export namespace Symbol {
    //General
    export const AnimationControllers: SymbolKind = SymbolKind.Class;
    export const Animation: SymbolKind = SymbolKind.Function;
    export const Block: SymbolKind = SymbolKind.Property;
    export const Effect: SymbolKind = SymbolKind.Property;
    export const Entity: SymbolKind = SymbolKind.Property;
    export const FakeEntity: SymbolKind = SymbolKind.EnumMember;
    export const Gamemode: SymbolKind = SymbolKind.Constant;
    export const Item: SymbolKind = SymbolKind.Property;
    export const Objectives: SymbolKind = SymbolKind.Variable;
    export const Tickingarea: SymbolKind = SymbolKind.Module;

    //BP
    export const Event: SymbolKind = SymbolKind.Event;
    export const Family: SymbolKind = SymbolKind.EnumMember;
    export const Functions: SymbolKind = SymbolKind.Class;
    export const LootTable: SymbolKind = SymbolKind.File;
    export const Trading: SymbolKind = SymbolKind.File;
    export const Structure: SymbolKind = SymbolKind.Module;

    //RP
    export const Fogs: SymbolKind = SymbolKind.File;
    export const Texture: SymbolKind = SymbolKind.File;
    export const Materials: SymbolKind = SymbolKind.Module;
    export const Models: SymbolKind = SymbolKind.File;
    export const Particle: SymbolKind = SymbolKind.Property;
    export const RenderController: SymbolKind = SymbolKind.Class;
    export const Sound: SymbolKind = SymbolKind.Property;

    //Types
    export const Boolean: SymbolKind = SymbolKind.Constant;
    export const Coordinate: SymbolKind = SymbolKind.Constant;
    export const Float: SymbolKind = SymbolKind.Constant;
    export const Integer: SymbolKind = SymbolKind.Constant;
    export const Selector: SymbolKind = SymbolKind.TypeParameter;
    export const Tag: SymbolKind = SymbolKind.Property;
    export const Xp: SymbolKind = SymbolKind.Constant;
  }

  export namespace Completion {
    //General
    export const AnimationControllers: CompletionItemKind = CompletionItemKind.Class;
    export const Animation: CompletionItemKind = CompletionItemKind.Function;
    export const Block: CompletionItemKind = CompletionItemKind.Property;
    export const Effect: CompletionItemKind = CompletionItemKind.Property;
    export const Entity: CompletionItemKind = CompletionItemKind.Property;
    export const FakeEntity: CompletionItemKind = CompletionItemKind.EnumMember;
    export const Gamemode: CompletionItemKind = CompletionItemKind.Constant;
    export const Item: CompletionItemKind = CompletionItemKind.Property;
    export const Objectives: CompletionItemKind = CompletionItemKind.Variable;
    export const Tickingarea: CompletionItemKind = CompletionItemKind.Module;

    //BP
    export const Event: CompletionItemKind = CompletionItemKind.Event;
    export const Family: CompletionItemKind = CompletionItemKind.EnumMember;
    export const Functions: CompletionItemKind = CompletionItemKind.Class;
    export const LootTable: CompletionItemKind = CompletionItemKind.File;
    export const Trading: CompletionItemKind = CompletionItemKind.File;
    export const Structure: CompletionItemKind = CompletionItemKind.Module;

    //RP
    export const Fogs: CompletionItemKind = CompletionItemKind.File;
    export const Texture: CompletionItemKind = CompletionItemKind.File;
    export const Materials: CompletionItemKind = CompletionItemKind.Module;
    export const Models: CompletionItemKind = CompletionItemKind.File;
    export const Particle: CompletionItemKind = CompletionItemKind.Property;
    export const RenderController: CompletionItemKind = CompletionItemKind.Class;
    export const Sound: CompletionItemKind = CompletionItemKind.Property;

    //Types
    export const Boolean: CompletionItemKind = CompletionItemKind.Constant;
    export const Coordinate: CompletionItemKind = CompletionItemKind.Constant;
    export const Float: CompletionItemKind = CompletionItemKind.Constant;
    export const Integer: CompletionItemKind = CompletionItemKind.Constant;
    export const Selector: CompletionItemKind = CompletionItemKind.TypeParameter;
    export const Tag: CompletionItemKind = CompletionItemKind.Property;
    export const Xp: CompletionItemKind = CompletionItemKind.Constant;
  }
}
