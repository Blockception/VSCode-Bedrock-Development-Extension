import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of tickingarea
export const tickingareaTree = createtickingarea();

function createtickingarea() : CommandStructureTree {
	var Tree = new CommandStructureTree("tickingarea");
	Tree.Description = "List ticking areas.";
	Tree.CanEnd = true;

	//Branch: tickingarea.list
	{
	var item_list = Tree.Add("list", CommandStructureType.Any);
	item_list.Description = "list";
	item_list.IsOptional = false;

	var item_all-dimensions = item_list.Add("all-dimensions", CommandStructureType.Any);
	item_all-dimensions.Description = "all-dimensions";
	item_all-dimensions.IsOptional = true;

	}

	//Branch: tickingarea.remove_all
	{
	var item_remove_all = Tree.Add("remove_all", CommandStructureType.Any);
	item_remove_all.Description = "remove_all";
	item_remove_all.IsOptional = false;

	}

	//Branch: tickingarea.remove
	{
	var item_remove = Tree.Add("remove", CommandStructureType.Any);
	item_remove.Description = "remove";
	item_remove.IsOptional = false;

	var item_positionxyz|namestring = item_remove.Add("position: x y z|name: string", CommandStructureType.Any);
	item_positionxyz|namestring.Description = "position: x y z|name: string";
	item_positionxyz|namestring.IsOptional = false;

	}

	//Branch: tickingarea.add
	{
	var item_add = Tree.Add("add", CommandStructureType.Any);
	item_add.Description = "add";
	item_add.IsOptional = false;

	//Branch: item_add.circle
	{
	var item_circle = item_add.Add("circle", CommandStructureType.Any);
	item_circle.Description = "circle";
	item_circle.IsOptional = false;

	var item_centerxyz = item_circle.Add("center: x y z", CommandStructureType.Any);
	item_centerxyz.Description = "center: x y z";
	item_centerxyz.IsOptional = false;

	var item_radiusint = item_centerxyz.Add("radius", CommandStructureType.Integer);
	item_radiusint.Description = "radius: int";
	item_radiusint.IsOptional = false;

	var item_namestring = item_radiusint.Add("name: string", CommandStructureType.Any);
	item_namestring.Description = "name: string";
	item_namestring.IsOptional = true;

	}

	//Branch: item_add.<from: x y z>
	{
	var item_fromxyz = item_add.Add("from: x y z", CommandStructureType.Any);
	item_fromxyz.Description = "from: x y z";
	item_fromxyz.IsOptional = false;

	var item_toxyz = item_fromxyz.Add("to: x y z", CommandStructureType.Any);
	item_toxyz.Description = "to: x y z";
	item_toxyz.IsOptional = false;

	var item_namestring = item_toxyz.Add("name: string", CommandStructureType.Any);
	item_namestring.Description = "name: string";
	item_namestring.IsOptional = true;

	}

	}

	return Tree;
}
