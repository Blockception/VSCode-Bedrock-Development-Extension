import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of stopsound
export const stopsoundTree = createstopsound();

function createstopsound() : CommandStructureTree {
	var Tree = new CommandStructureTree("stopsound");
	Tree.Description = "Stops a sound.";
	Tree.CanEnd = true;

	var item_playertarget = Tree.Add("player", CommandStructureType.Target);
	item_playertarget.Description = "The player target/selector";
	item_playertarget.IsOptional = false;

	var item_soundstring = item_playertarget.Add("sound: string", CommandStructureType.Any);
	item_soundstring.Description = "sound: string";
	item_soundstring.IsOptional = true;

	return Tree;
}
