import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of tag
export const tagTree = createtag();

function createtag() : CommandStructureTree {
	var Tree = new CommandStructureTree("tag");
	Tree.Description = "Remove tags stored in entities";
	Tree.CanEnd = true;

	var item_targets = Tree.Add("targets", CommandStructureType.Any);
	item_targets.Description = "targets";
	item_targets.IsOptional = false;

	//Branch: item_targets.remove
	{
	var item_remove = Tree.Add("remove", CommandStructureType.Any);
	item_remove.Description = "remove";
	item_remove.IsOptional = false;

	var item_name = Tree.Add("name", CommandStructureType.Any);
	item_name.Description = "name";
	item_name.IsOptional = false;

	}

	//Branch: item_targets.list
	{
	var item_list = Tree.Add("list", CommandStructureType.Any);
	item_list.Description = "list";
	item_list.IsOptional = false;

	}

	//Branch: item_targets.add
	{
	var item_add = Tree.Add("add", CommandStructureType.Any);
	item_add.Description = "add";
	item_add.IsOptional = false;

	var item_name = Tree.Add("name", CommandStructureType.Any);
	item_name.Description = "name";
	item_name.IsOptional = false;

	}

	return Tree;
}
