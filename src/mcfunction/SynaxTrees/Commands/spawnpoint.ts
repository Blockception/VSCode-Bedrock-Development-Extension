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

	var item_x = item_playertarget.Add("position: x", CommandStructureType.Coordinate);
	item_x.Description = "The x coordinate to place the player spawn at";
	item_x.IsOptional = true;

	var item_y = item_x.Add("position: y", CommandStructureType.Coordinate);
	item_y.Description = "The y coordinate to place the player spawn at";
	item_y.IsOptional = true;

	var item_z = item_y.Add("position: z", CommandStructureType.Coordinate);
	item_z.Description = "The z coordinate to place the player spawn at";
	item_z.IsOptional = true;

	return Tree;
}
