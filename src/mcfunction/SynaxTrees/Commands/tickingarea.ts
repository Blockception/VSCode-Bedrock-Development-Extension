import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of tickingarea
export const tickingareaTree = createtickingarea();

function createtickingarea() : CommandStructureTree {
	var Tree = new CommandStructureTree("tickingarea");
	Tree.Description = "List ticking areas.";
	Tree.CanEnd = true;

	//Branch: tickingarea.list
	{
		var item_list = Tree.Add("list", CommandStructureType.SameAsName);
		item_list.Description = "list";
		item_list.IsOptional = false;

		var item_all_dimensions = item_list.Add("all-dimensions", CommandStructureType.SameAsName);
		item_all_dimensions.Description = "all-dimensions";
		item_all_dimensions.IsOptional = true;
	}

	//Branch: tickingarea.remove_all
	{
		var item_remove_all = Tree.Add("remove_all", CommandStructureType.SameAsName);
		item_remove_all.Description = "remove_all";
		item_remove_all.IsOptional = false;
	}

	//Branch: tickingarea.remove
	{
		var item_remove = Tree.Add("remove", CommandStructureType.SameAsName);
		item_remove.Description = "remove";
		item_remove.IsOptional = false;

		var item_x = item_remove.Add("position: x", CommandStructureType.Coordinate);
		item_x.Description = "The x coordinate to look at";
		item_x.IsOptional = false;

		var item_y = item_x.Add("position: y", CommandStructureType.Coordinate);
		item_y.Description = "The y coordinate to look at";
		item_y.IsOptional = false;

		var item_z = item_y.Add("position: z", CommandStructureType.Coordinate);
		item_z.Description = "The z coordinate to look at";
		item_z.IsOptional = false;
	}

	//Branch: tickingarea.add
	{
	var item_add = Tree.Add("add", CommandStructureType.SameAsName);
	item_add.Description = "add";
	item_add.IsOptional = false;

		//Branch: item_add.circle
		{
			var item_circle = item_add.Add("circle", CommandStructureType.SameAsName);
			item_circle.Description = "circle";
			item_circle.IsOptional = false;

			var item_x = item_circle.Add("position: x", CommandStructureType.Coordinate);
			item_x.Description = "The x coordinate to look at";
			item_x.IsOptional = false;

			var item_y = item_x.Add("position: y", CommandStructureType.Coordinate);
			item_y.Description = "The y coordinate to look at";
			item_y.IsOptional = false;

			var item_z = item_y.Add("position: z", CommandStructureType.Coordinate);
			item_z.Description = "The z coordinate to look at";
			item_z.IsOptional = false;

			var item_radiusint = item_z.Add("radius", CommandStructureType.Integer);
			item_radiusint.Description = "radius: int";
			item_radiusint.IsOptional = false;

			var item_namestring = item_radiusint.Add("name: string", CommandStructureType.String);
			item_namestring.Description = "name: string";
			item_namestring.IsOptional = true;
		}

		//Branch: item_add.<from: x y z>
		{
			var item_beginx = item_add.Add("start: x", CommandStructureType.Coordinate);
			item_beginx.Description = "The x coordinate to start to look at";
			item_beginx.IsOptional = false;
		
			var item_beginy = item_beginx.Add("start: y", CommandStructureType.Coordinate);
			item_beginy.Description = "The y coordinate to start to look at";
			item_beginy.IsOptional = false;
		
			var item_beginz = item_beginy.Add("start: z", CommandStructureType.Coordinate);
			item_beginz.Description = "The z coordinate to start to look at";
			item_beginz.IsOptional = false;
		
			var item_endx = Tree.Add("end: x", CommandStructureType.Coordinate);
			item_endx.Description = "The x coordinate to end to look at";
			item_endx.IsOptional = false;
		
			var item_endy = item_endx.Add("end: y", CommandStructureType.Coordinate);
			item_endy.Description = "The y coordinate to end to look at";
			item_endy.IsOptional = false;
		
			var item_endz = item_endy.Add("end: z", CommandStructureType.Coordinate);
			item_endz.Description = "The z coordinate to end to look at";
			item_endz.IsOptional = false;

			var item_namestring = item_endz.Add("name: string", CommandStructureType.String);
			item_namestring.Description = "name: string";
			item_namestring.IsOptional = true;
		}

	}

	return Tree;
}
