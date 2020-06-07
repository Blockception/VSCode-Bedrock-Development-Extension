import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of spreadplayers
export const spreadplayersTree = createspreadplayers();

function createspreadplayers() : CommandStructureTree {
	var Tree = new CommandStructureTree("spreadplayers");
	Tree.Description = "Teleports entities to random locations.";
	Tree.CanEnd = true;

	var item_xvalue = Tree.Add("x: value", CommandStructureType.Any);
	item_xvalue.Description = "x: value";
	item_xvalue.IsOptional = false;

	var item_zvalue = item_xvalue.Add("z: value", CommandStructureType.Any);
	item_zvalue.Description = "z: value";
	item_zvalue.IsOptional = false;

	var item_spreadDistancefloat = item_zvalue.Add("spreadDistance: float", CommandStructureType.Any);
	item_spreadDistancefloat.Description = "spreadDistance: float";
	item_spreadDistancefloat.IsOptional = false;

	var item_maxRangefloat = item_spreadDistancefloat.Add("maxRange: float", CommandStructureType.Any);
	item_maxRangefloat.Description = "maxRange: float";
	item_maxRangefloat.IsOptional = false;

	var item_victimtarget = item_maxRangefloat.Add("victim", CommandStructureType.Target);
	item_victimtarget.Description = "victim: target";
	item_victimtarget.IsOptional = false;

	return Tree;
}
