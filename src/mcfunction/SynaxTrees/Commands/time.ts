import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of time
export const timeTree = createtime();

function createtime() : CommandStructureTree {
	var Tree = new CommandStructureTree("time");
	Tree.Description = "Changes or queries the world's game time.";
	Tree.CanEnd = true;

	//Branch: time.add
	{
	var item_add = Tree.Add("add", CommandStructureType.Any);
	item_add.Description = "add";
	item_add.IsOptional = false;

	var item_amount = Tree.Add("amount:", CommandStructureType.Any);
	item_amount.Description = "amount:";
	item_amount.IsOptional = false;

	var item_int = Tree.Add("int", CommandStructureType.Any);
	item_int.Description = "int";
	item_int.IsOptional = false;

	}

	//Branch: time.set
	{
	var item_set = Tree.Add("set", CommandStructureType.Any);
	item_set.Description = "set";
	item_set.IsOptional = false;

	var item_time = Tree.Add("time:", CommandStructureType.Any);
	item_time.Description = "time:";
	item_time.IsOptional = false;

	var item_TimeSpec|amount = Tree.Add("TimeSpec|amount:", CommandStructureType.Any);
	item_TimeSpec|amount.Description = "TimeSpec|amount:";
	item_TimeSpec|amount.IsOptional = false;

	var item_int = Tree.Add("int", CommandStructureType.Any);
	item_int.Description = "int";
	item_int.IsOptional = false;

	}

	//Branch: time.query
	{
	var item_query = Tree.Add("query", CommandStructureType.Any);
	item_query.Description = "query";
	item_query.IsOptional = false;

	var item_daytime|gametime|day = Tree.Add("daytime|gametime|day", CommandStructureType.Any);
	item_daytime|gametime|day.Description = "daytime|gametime|day";
	item_daytime|gametime|day.IsOptional = false;

	}

	return Tree;
}
