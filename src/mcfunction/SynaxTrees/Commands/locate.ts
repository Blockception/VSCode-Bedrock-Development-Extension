import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of locate
export const locateTree = createlocate();

function createlocate() : CommandStructureTree {
	var Tree = new CommandStructureTree("locate");
	Tree.Description = "Display the coordinates for the closest structure of a given type.";
	Tree.CanEnd = true;

	//Branch: locate.buriedtreasure
	{
	var item_buriedtreasure = Tree.Add("buriedtreasure", CommandStructureType.SameAsName);
	item_buriedtreasure.Description = "buriedtreasure";
	item_buriedtreasure.IsOptional = false;
	}

	//Branch: locate.endcity
	{
	var item_endcity = Tree.Add("endcity", CommandStructureType.SameAsName);
	item_endcity.Description = "endcity";
	item_endcity.IsOptional = false;
	}

	//Branch: locate.fortress
	{
	var item_fortress = Tree.Add("fortress", CommandStructureType.SameAsName);
	item_fortress.Description = "fortress";
	item_fortress.IsOptional = false;
	}

	//Branch: locate.mansion
	{
	var item_mansion = Tree.Add("mansion", CommandStructureType.SameAsName);
	item_mansion.Description = "mansion";
	item_mansion.IsOptional = false;
	}

	//Branch: locate.mineshaft
	{
	var item_mineshaft = Tree.Add("mineshaft", CommandStructureType.SameAsName);
	item_mineshaft.Description = "mineshaft";
	item_mineshaft.IsOptional = false;
	}

	//Branch: locate.monument
	{
	var item_monument = Tree.Add("monument", CommandStructureType.SameAsName);
	item_monument.Description = "monument";
	item_monument.IsOptional = false;
	}

	//Branch: locate.ruins
	{
	var item_ruins = Tree.Add("ruins", CommandStructureType.SameAsName);
	item_ruins.Description = "ruins";
	item_ruins.IsOptional = false;
	}

	//Branch: locate.shipwreck
	{
	var item_shipwreck = Tree.Add("shipwreck", CommandStructureType.SameAsName);
	item_shipwreck.Description = "shipwreck";
	item_shipwreck.IsOptional = false;
	}

	//Branch: locate.stronghold
	{
	var item_stronghold = Tree.Add("stronghold", CommandStructureType.SameAsName);
	item_stronghold.Description = "stronghold";
	item_stronghold.IsOptional = false;
	}

	//Branch: locate.temple
	{
	var item_temple = Tree.Add("temple", CommandStructureType.SameAsName);
	item_temple.Description = "temple";
	item_temple.IsOptional = false;
	}

	//Branch: locate.village
	{
	var item_village = Tree.Add("village", CommandStructureType.SameAsName);
	item_village.Description = "village";
	item_village.IsOptional = false;
	}

	//Branch: locate.pillageroutpost
	{
	var item_pillageroutpost = Tree.Add("pillageroutpost", CommandStructureType.SameAsName);
	item_pillageroutpost.Description = "pillageroutpost";
	item_pillageroutpost.IsOptional = false;
	}

	return Tree;
}
