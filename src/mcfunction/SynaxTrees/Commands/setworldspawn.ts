import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of setworldspawn
export const setworldspawnTree = createsetworldspawn();

function createsetworldspawn() : CommandStructureTree {
	var Tree = new CommandStructureTree("setworldspawn");
	Tree.Description = "Sets the world spawn.";
	Tree.CanEnd = true;

	var item_x = Tree.Add("position: x", CommandStructureType.Coordinate);
	item_x.Description = "The x coordinate to place the world spawn at";
	item_x.IsOptional = true;

	var item_y = item_x.Add("position: y", CommandStructureType.Coordinate);
	item_y.Description = "The y coordinate to place the world spawn at";
	item_y.IsOptional = true;

	var item_z = item_y.Add("position: z", CommandStructureType.Coordinate);
	item_z.Description = "The z coordinate to place the world spawn at";
	item_z.IsOptional = true;

	return Tree;
}
