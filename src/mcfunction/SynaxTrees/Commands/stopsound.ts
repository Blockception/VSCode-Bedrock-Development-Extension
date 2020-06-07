import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of stopsound
export const stopsoundTree = createstopsound();

function createstopsound() : CommandStructureTree {
	var Tree = new CommandStructureTree("stopsound");
	Tree.Description = "Stops a sound.";
	Tree.CanEnd = true;

	var item_player = Tree.Add("player:", CommandStructureType.Any);
	item_player.Description = "player:";
	item_player.IsOptional = false;

	var item_target = Tree.Add("target", CommandStructureType.Target);
	item_target.Description = "target";
	item_target.IsOptional = false;

	var item_soundstring = Tree.Add("sound: string", CommandStructureType.Any);
	item_soundstring.Description = "sound: string";
	item_soundstring.IsOptional = true;

	return Tree;
}
