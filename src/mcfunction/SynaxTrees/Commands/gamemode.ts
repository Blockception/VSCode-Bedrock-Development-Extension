import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of gamemode
export const gamemodeTree = creategamemode();

function creategamemode() : CommandStructureTree {
	var Tree = new CommandStructureTree("gamemode");
	Tree.Description = "Sets a player's game mode.";
	Tree.CanEnd = true;

	var item_0|1|2|s|d|c|a|adventure|creative|default|survival = Tree.Add("0|1|2|s|d|c|a|adventure|creative|default|survival", CommandStructureType.Any);
	item_0|1|2|s|d|c|a|adventure|creative|default|survival.Description = "0|1|2|s|d|c|a|adventure|creative|default|survival";
	item_0|1|2|s|d|c|a|adventure|creative|default|survival.IsOptional = false;

	var item_playertarget = Tree.Add("player: target", CommandStructureType.Target);
	item_playertarget.Description = "The target/selector that targets a player";
	item_playertarget.IsOptional = true;

	return Tree;
}
