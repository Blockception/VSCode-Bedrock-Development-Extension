import { CommandStructureTree, CommandStructureType, CommandStructureItem } from "../CommandStructure";

//The tree structure of tag
export const tagTree = createtag();

function createtag() : CommandStructureTree {
	var Tree = new CommandStructureTree("tag");
	Tree.Description = "Remove tags stored in entities";
	Tree.CanEnd = true;

	var item_tag = new CommandStructureItem("tag", CommandStructureType.Tag);
	item_tag.Description = "tag";
	item_tag.IsOptional = false;

	var item_targets = Tree.Add("targets", CommandStructureType.Target);
	item_targets.Description = "targets";
	item_targets.IsOptional = false;

	//Branch: item_targets.remove
	{
	var item_remove = item_targets.Add("remove", CommandStructureType.SameAsName);
	item_remove.Description = "remove";
	item_remove.IsOptional = false;
	item_remove.Childs.push(item_tag);	
	}

	//Branch: item_targets.list
	{
	var item_list = item_targets.Add("list", CommandStructureType.SameAsName);
	item_list.Description = "list";
	item_list.IsOptional = false;
	}

	//Branch: item_targets.add
	{
	var item_add = item_targets.Add("add", CommandStructureType.SameAsName);
	item_add.Description = "add";
	item_add.IsOptional = false;
	item_add.Childs.push(item_tag);
	}

	return Tree;
}
