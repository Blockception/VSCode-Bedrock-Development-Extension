import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of spawnpoint
export const spawnpointTree = createspawnpoint();

function createspawnpoint() : CommandStructureTree {
	var Tree = new CommandStructureTree("spawnpoint");
	Tree.Description = "Sets the spawn point for a player.";
	Tree.CanEnd = true;

	var item_playertarget = Tree.Add("player", CommandStructureType.Target);
	item_playertarget.Description = "The player target/selector";
	item_playertarget.IsOptional = true;

	var item_spawnPosxyz = item_playertarget.Add("spawnPos: x y z", CommandStructureType.Any);
	item_spawnPosxyz.Description = "spawnPos: x y z";
	item_spawnPosxyz.IsOptional = true;

	return Tree;
}
