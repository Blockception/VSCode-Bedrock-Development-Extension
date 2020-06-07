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

	var item_all-dimensions = Tree.Add("all-dimensions", CommandStructureType.Any);
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

	var item_position = Tree.Add("position:", CommandStructureType.Any);
	item_position.Description = "position:";
	item_position.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z|name = Tree.Add("z|name:", CommandStructureType.Any);
	item_z|name.Description = "z|name:";
	item_z|name.IsOptional = false;

	var item_string = Tree.Add("string", CommandStructureType.Any);
	item_string.Description = "string";
	item_string.IsOptional = false;

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

	var item_center = Tree.Add("center:", CommandStructureType.Any);
	item_center.Description = "center:";
	item_center.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	var item_radius = Tree.Add("radius:", CommandStructureType.Any);
	item_radius.Description = "radius:";
	item_radius.IsOptional = false;

	var item_int = Tree.Add("int", CommandStructureType.Any);
	item_int.Description = "int";
	item_int.IsOptional = false;

	var item_namestring = Tree.Add("name: string", CommandStructureType.Any);
	item_namestring.Description = "name: string";
	item_namestring.IsOptional = true;

	}

	//Branch: item_add.<from:
	{
	var item_from = item_add.Add("from:", CommandStructureType.Any);
	item_from.Description = "from:";
	item_from.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	var item_to = Tree.Add("to:", CommandStructureType.Any);
	item_to.Description = "to:";
	item_to.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	var item_namestring = Tree.Add("name: string", CommandStructureType.Any);
	item_namestring.Description = "name: string";
	item_namestring.IsOptional = true;

	}

	}

	return Tree;
}
