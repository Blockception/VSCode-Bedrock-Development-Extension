import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of spreadplayers
export const spreadplayersTree = createspreadplayers();

function createspreadplayers() : CommandStructureTree {
	var Tree = new CommandStructureTree("spreadplayers");
	Tree.Description = "Teleports entities to random locations.";
	Tree.CanEnd = true;

	var item_x = Tree.Add("x:", CommandStructureType.Any);
	item_x.Description = "x:";
	item_x.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = false;

	var item_z = Tree.Add("z:", CommandStructureType.Any);
	item_z.Description = "z:";
	item_z.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = false;

	var item_spreadDistance = Tree.Add("spreadDistance:", CommandStructureType.Any);
	item_spreadDistance.Description = "spreadDistance:";
	item_spreadDistance.IsOptional = false;

	var item_float = Tree.Add("float", CommandStructureType.Any);
	item_float.Description = "float";
	item_float.IsOptional = false;

	var item_maxRange = Tree.Add("maxRange:", CommandStructureType.Any);
	item_maxRange.Description = "maxRange:";
	item_maxRange.IsOptional = false;

	var item_float = Tree.Add("float", CommandStructureType.Any);
	item_float.Description = "float";
	item_float.IsOptional = false;

	var item_victim = Tree.Add("victim:", CommandStructureType.Any);
	item_victim.Description = "victim:";
	item_victim.IsOptional = false;

	var item_target = Tree.Add("target", CommandStructureType.Any);
	item_target.Description = "target";
	item_target.IsOptional = false;

	return Tree;
}
