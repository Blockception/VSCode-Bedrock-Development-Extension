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

	var item_amountint = item_add.Add("amount", CommandStructureType.Integer);
	item_amountint.Description = "amount: int";
	item_amountint.IsOptional = false;

	}

	//Branch: time.set
	{
	var item_set = Tree.Add("set", CommandStructureType.Any);
	item_set.Description = "set";
	item_set.IsOptional = false;

	var item_timeTimeSpec|amountint = item_set.Add("time: TimeSpec|amount", CommandStructureType.Integer);
	item_timeTimeSpec|amountint.Description = "time: TimeSpec|amount: int";
	item_timeTimeSpec|amountint.IsOptional = false;

	}

	//Branch: time.query
	{
	var item_query = Tree.Add("query", CommandStructureType.Any);
	item_query.Description = "query";
	item_query.IsOptional = false;

	var item_daytime|gametime|day = item_query.Add("daytime|gametime|day", CommandStructureType.Any);
	item_daytime|gametime|day.Description = "daytime|gametime|day";
	item_daytime|gametime|day.IsOptional = false;

	}

	return Tree;
}
