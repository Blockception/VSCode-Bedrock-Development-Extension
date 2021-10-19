import { CompletionItemKind, SymbolKind } from "vscode-languageserver";

export namespace Kinds {
  export namespace Symbol {
    //General
    export const AnimationControllers: SymbolKind = SymbolKind.Function;
    export const Animation: SymbolKind = SymbolKind.Method;
    export const Block: SymbolKind = SymbolKind.Class;
    export const Effect: SymbolKind = SymbolKind.Class;
    export const Entity: SymbolKind = SymbolKind.Class;
    export const FakeEntity: SymbolKind = SymbolKind.Interface;
    export const Gamemode: SymbolKind = SymbolKind.Constant;
    export const Item: SymbolKind = SymbolKind.Property;
    export const Objectives: SymbolKind = SymbolKind.Variable;
    export const Tickingarea: SymbolKind = SymbolKind.Module;

    //BP
    export const Event: SymbolKind = SymbolKind.Event;
    export const Family: SymbolKind = SymbolKind.EnumMember;
    export const Functions: SymbolKind = SymbolKind.Class;
    export const LootTable: SymbolKind = SymbolKind.Struct;
    export const Trading: SymbolKind = SymbolKind.Struct;
    export const Structure: SymbolKind = SymbolKind.Module;

    //RP
    export const Fogs: SymbolKind = SymbolKind.Struct;
    export const Texture: SymbolKind = SymbolKind.Struct;
    export const Materials: SymbolKind = SymbolKind.Module;
    export const Models: SymbolKind = SymbolKind.Class;
    export const Particle: SymbolKind = SymbolKind.Class;
    export const RenderController: SymbolKind = SymbolKind.Class;
    export const Sound: SymbolKind = SymbolKind.Array;

    //Types
    export const Boolean: SymbolKind = SymbolKind.Constant;
    export const Coordinate: SymbolKind = SymbolKind.Constant;
    export const Command: SymbolKind = SymbolKind.Class;
    export const Float: SymbolKind = SymbolKind.Constant;
    export const Integer: SymbolKind = SymbolKind.Constant;
    export const Selector: SymbolKind = SymbolKind.TypeParameter;
    export const Tag: SymbolKind = SymbolKind.Property;
    export const Xp: SymbolKind = SymbolKind.Constant;
  }

  export namespace Completion {
    //General
    export const AnimationControllers: CompletionItemKind = CompletionItemKind.Function;
    export const Animation: CompletionItemKind = CompletionItemKind.Method;
    export const Block: CompletionItemKind = CompletionItemKind.Class;
    export const Effect: CompletionItemKind = CompletionItemKind.Class;
    export const Entity: CompletionItemKind = CompletionItemKind.Class;
    export const FakeEntity: CompletionItemKind = CompletionItemKind.Interface;
    export const Gamemode: CompletionItemKind = CompletionItemKind.Constant;
    export const Item: CompletionItemKind = CompletionItemKind.Property;
    export const Objectives: CompletionItemKind = CompletionItemKind.Variable;
    export const Tickingarea: CompletionItemKind = CompletionItemKind.Module;

    //BP
    export const Event: CompletionItemKind = CompletionItemKind.Event;
    export const Family: CompletionItemKind = CompletionItemKind.EnumMember;
    export const Functions: CompletionItemKind = CompletionItemKind.Class;
    export const LootTable: CompletionItemKind = CompletionItemKind.Struct;
    export const Trading: CompletionItemKind = CompletionItemKind.Struct;
    export const Structure: CompletionItemKind = CompletionItemKind.Module;

    //RP
    export const Fogs: CompletionItemKind = CompletionItemKind.Struct;
    export const Texture: CompletionItemKind = CompletionItemKind.Struct;
    export const Materials: CompletionItemKind = CompletionItemKind.Module;
    export const Models: CompletionItemKind = CompletionItemKind.Class;
    export const Particle: CompletionItemKind = CompletionItemKind.Class;
    export const RenderController: CompletionItemKind = CompletionItemKind.Class;
    export const Sound: CompletionItemKind = CompletionItemKind.Value;

    //Types
    export const Boolean: CompletionItemKind = CompletionItemKind.Constant;
    export const Coordinate: CompletionItemKind = CompletionItemKind.Constant;
    export const Command: CompletionItemKind = CompletionItemKind.Class;
    export const Float: CompletionItemKind = CompletionItemKind.Constant;
    export const Integer: CompletionItemKind = CompletionItemKind.Constant;
    export const Selector: CompletionItemKind = CompletionItemKind.TypeParameter;
    export const Tag: CompletionItemKind = CompletionItemKind.Property;
    export const Xp: CompletionItemKind = CompletionItemKind.Constant;

    export const Vanilla: CompletionItemKind = CompletionItemKind.Unit;
  }
}
