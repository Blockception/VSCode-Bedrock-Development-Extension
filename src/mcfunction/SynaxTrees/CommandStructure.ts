export enum CommandStructureType {
    Any,
    Boolean,
    Block,
    Command,
    Coordinate,
    Effect,
    Enchantment,
    Entity,
    Integer,
    Item,
    Json,    
    Number,    
    Objective,
    Particle,
    SameAsName,
    Tag,
    Target
}

export class CommandStructureTree {
    public CanEnd : boolean;
    public Description : string;
    public Name : string;
    public Root : Array<CommandStructureItem>;

    constructor(Name : string){
        this.CanEnd = false;
        this.Name = Name;
        this.Description = "";
        this.Root = new Array<CommandStructureItem>();
    }

    Add(Name : string, Type : CommandStructureType) : CommandStructureItem {
        var Item = new CommandStructureItem(Name, Type);
        this.Root.push(Item);
        return Item;
    }
}

export class CommandStructureItem {
    public CanEnd : boolean;
    public Childs : Array<CommandStructureItem>;
    public Description : string;
    public IsOptional : boolean;    
    public MustMatch : string | undefined
    public Name : string;
    public Type : CommandStructureType;

    constructor(Name : string, Type : CommandStructureType) {
        this.CanEnd = false;
        this.Childs = new Array<CommandStructureItem>();
        this.Description = "";                
        this.IsOptional = false;
        this.MustMatch = undefined;
        this.Name = Name;
        this.Type = Type;
    }

    Add(Name : string, Type : CommandStructureType) : CommandStructureItem {
        var Item = new CommandStructureItem(Name, Type);
        this.Childs.push(Item);
        return Item;
    }
}