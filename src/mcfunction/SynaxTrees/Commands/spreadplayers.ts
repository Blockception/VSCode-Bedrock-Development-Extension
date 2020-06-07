import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of spreadplayers
export const spreadplayersTree = createspreadplayers();

function createspreadplayers() : CommandStructureTree {
	var Tree = new CommandStructureTree("spreadplayers");
	Tree.Description = "Teleports entities to random locations.";
	Tree.CanEnd = true;

	var item_xvalue = Tree.Add("x", CommandStructureType.Number);
	item_xvalue.Description = "x";
	item_xvalue.IsOptional = false;

	var item_zvalue = item_xvalue.Add("z", CommandStructureType.Number);
	item_zvalue.Description = "z";
	item_zvalue.IsOptional = false;

	var item_spreadDistancefloat = item_zvalue.Add("spreadDistance", CommandStructureType.Number);
	item_spreadDistancefloat.Description = "spreadDistance: float";
	item_spreadDistancefloat.IsOptional = false;

	var item_maxRangefloat = item_spreadDistancefloat.Add("maxRange", CommandStructureType.Number);
	item_maxRangefloat.Description = "maxRange: float";
	item_maxRangefloat.IsOptional = false;

	var item_victimtarget = item_maxRangefloat.Add("victim", CommandStructureType.Target);
	item_victimtarget.Description = "victim: target";
	item_victimtarget.IsOptional = false;

	return Tree;
}
