import * as vscode from 'vscode';
import * as CompletionFunction from "./functions/CompletionFunctions"
import * as Functions from "./functions/Functions"
import * as Scoreboard from "./commands/Scoreboard"

export class McFunctionCompletion implements vscode.CompletionItemProvider {

    AllCommands: vscode.CompletionItem[];

    constructor(){
        this.AllCommands = [
            CompletionFunction.createCompletionItem("alwaysday", "alwaysday", "Locks and unlocks the day-night cycle."),
            CompletionFunction.createCompletionItem("clear", "clear", "Clears items from player inventory."),
            CompletionFunction.createCompletionItem("connect", "connect", "Attempts to connect to the websocket server on the provided URL."),
            CompletionFunction.createCompletionItem("clone", "clone", "Clones blocks from one region to another."),
            CompletionFunction.createCompletionItem("daylock", "daylock", "Locks and unlocks the day-night cycle."),
            CompletionFunction.createCompletionItem("deop", "deop", "Revokes operator status from a player."),
            CompletionFunction.createCompletionItem("difficulty", "difficulty", "Sets the difficulty level."),
            CompletionFunction.createCompletionItem("effect", "effect", "Add or Remove status effects."),
            CompletionFunction.createCompletionItem("enchant", "enchant", "Adds an echantment to a player's selected item."),
            CompletionFunction.createCompletionItem("execute", "execute", "Executes a command on behalf of one or more entities."),
            CompletionFunction.createCompletionItem("fill", "fill", "Fills all or parts of a region with a specific block."),
            CompletionFunction.createCompletionItem("function", "function", "Runs commands found in the corresponding function file."),
            CompletionFunction.createCompletionItem("gamemode", "gamemode", "Sets a player's game mode."),
            CompletionFunction.createCompletionItem("gamerule", "gamerule", "Whether command blocks should be enabled in-game."),
            CompletionFunction.createCompletionItem("give", "give", "Gives an item to a player."),
            CompletionFunction.createCompletionItem("kill", "kill", "Kills entities"),
            CompletionFunction.createCompletionItem("locate", "locate", "Display the coordinates for the closest structure of a given type."),
            CompletionFunction.createCompletionItem("me", "me", "Displays a message about yourself"),
            CompletionFunction.createCompletionItem("msg", "msg", "Sends a private message to one or more players."),
            CompletionFunction.createCompletionItem("mobevent", "mobevent", "Controls what mob events are allowed to run."),
            CompletionFunction.createCompletionItem("op", "op", "Grants operator status to a player."),
            CompletionFunction.createCompletionItem("particle", "particle", "Creates a particle emitter"),
            CompletionFunction.createCompletionItem("playsound", "playsound", "Plays a sound."),
            CompletionFunction.createCompletionItem("replaceitem", "replaceitem", "Replaces items in inventories"),
            CompletionFunction.createCompletionItem("reload", "reload", "Reloads all function files from all behaviour packs."),
            CompletionFunction.createCompletionItem("say", "say", "Sends a message in the chat to other players."),
            CompletionFunction.createCompletionItem("scoreboard", "scoreboard", "Lists all created variables in the scoreboard"),
            CompletionFunction.createCompletionItem("setblock", "setblock", "Changes a block to another block."),
            CompletionFunction.createCompletionItem("setmaxplayers", "setmaxplayers", "Sets the maximum number of players for this game session."),
            CompletionFunction.createCompletionItem("setworldspawn", "setworldspawn", "Sets the world spawn."),
            CompletionFunction.createCompletionItem("spawnpoint", "spawnpoint", "Sets the spawn point for a player."),
            CompletionFunction.createCompletionItem("spreadplayers", "spreadplayers", "Teleports entities to random locations."),
            CompletionFunction.createCompletionItem("stopsound", "stopsound", "Stops a sound."),
            CompletionFunction.createCompletionItem("summon", "summon", "Summons an entity."),
            CompletionFunction.createCompletionItem("tag", "tag", "Remove tags stored in entities"),
            CompletionFunction.createCompletionItem("tell", "tell", "Sends a private message to one or more players."),
            CompletionFunction.createCompletionItem("tellraw", "tellraw", "Sends a JSON message to players."),
            CompletionFunction.createCompletionItem("tp", "tp", "Teleports entities"),
            CompletionFunction.createCompletionItem("teleport", "teleport", "Teleports entities"),
            CompletionFunction.createCompletionItem("testfor", "testfor", "Counts entities maching specified conditions."),
            CompletionFunction.createCompletionItem("testforblock", "testforblock", "Tests whether a certain block is in a specific location."),
            CompletionFunction.createCompletionItem("testforblocks", "testforblocks", "Tests whether the blocks in two regions match."),
            CompletionFunction.createCompletionItem("tickingarea", "tickingarea", "List ticking areas."),
            CompletionFunction.createCompletionItem("time", "time", "Changes or queries the world's game time."),
            CompletionFunction.createCompletionItem("title", "title", "Controls screen titles"),
            CompletionFunction.createCompletionItem("titleraw", "titleraw", "Controls screen titles with JSON messages."),
            CompletionFunction.createCompletionItem("toggledownfall", "toggledownfall", "Toggles the weather."),
            CompletionFunction.createCompletionItem("weather", "weather", "Sets the weather"),
            CompletionFunction.createCompletionItem("w", "w", "Sends a private message to one or more players."),
            CompletionFunction.createCompletionItem("xp", "xp", "Adds or removes player experience.")
        ];        
    }

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context : vscode.CompletionContext) 
    : vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {

        var Line = document.lineAt(position);
        var Text = Line.text;

        if (Line.isEmptyOrWhitespace || position.character == 0)
            return this.AllCommands;

        var PrefixText = Text.substring(0, position.character);
        var Collection = new vscode.CompletionList();

        if (PrefixText.startsWith("#")){
            Collection.items.push(CompletionFunction.createCompletionItem("region\n# endregion", "region", "A comment region"))
        }

        var Command = Functions.GetCommand(Text);

        switch(Command){
            case "scoreboard":
                Scoreboard.CompletionItems(PrefixText, position, Collection);
                break;
        };

        return Collection;
    }


}