import { CommandStructureTree, CommandStructureType, CommandStructureItem } from "../CommandStructure";

//The tree structure of replaceitem
export const replaceitemTree = createreplaceitem();

function createreplaceitem() : CommandStructureTree {
	var Tree = new CommandStructureTree("replaceitem");
	Tree.Description = "Replaces items in inventories";
	Tree.CanEnd = true;

	//Branch: replaceitem.block
	{
		var item_block = Tree.Add("block", CommandStructureType.SameAsName);
		item_block.Description = "block";
		item_block.IsOptional = false;

		var item_x = item_block.Add("position: x", CommandStructureType.Coordinate);
		item_x.Description = "The x coordinate to lookat";
		item_x.IsOptional = true;
	
		var item_y = item_x.Add("position: y", CommandStructureType.Coordinate);
		item_y.Description = "The y coordinate to lookat";
		item_y.IsOptional = true;
	
		var item_z = item_y.Add("position: z", CommandStructureType.Coordinate);
		item_z.Description = "The z coordinate to lookat";
		item_z.IsOptional = true;

		var item_slot_container = item_z.Add("slot.container", CommandStructureType.Any);
		item_slot_container.Description = "slot.container";
		item_slot_container.IsOptional = false;
	}

	//Branch: replaceitem.entity
	{
		var item_entity = Tree.Add("entity", CommandStructureType.SameAsName);
		item_entity.Description = "entity";
		item_entity.IsOptional = false;

		var item_target = item_entity.Add("target", CommandStructureType.Target);
		item_target.Description = "target: target";
		item_target.IsOptional = false;

		var item_slotTypeEntityEquipmentSlot = item_target.Add("slotType: EntityEquipmentSlot", CommandStructureType.Any);
		item_slotTypeEntityEquipmentSlot.Description = "slotType: EntityEquipmentSlot";
		item_slotTypeEntityEquipmentSlot.IsOptional = false;
	}

	var item_slotIdint = new CommandStructureItem("slotId", CommandStructureType.Integer);
	item_slot_container.Childs.push(item_slotIdint);
	item_slotTypeEntityEquipmentSlot.Childs.push(item_slotIdint);

	item_slotIdint.Description = "slotId: int";
	item_slotIdint.IsOptional = false;

	var item_itemNameItem = item_slotIdint.Add("itemName: Item", CommandStructureType.Item);
	item_itemNameItem.Description = "itemName: Item";
	item_itemNameItem.IsOptional = false;

	var item_amountint = item_itemNameItem.Add("amount", CommandStructureType.Integer);
	item_amountint.Description = "amount: int";
	item_amountint.IsOptional = true;

	var item_dataint = item_amountint.Add("data", CommandStructureType.Integer);
	item_dataint.Description = "data: int";
	item_dataint.IsOptional = true;

	var item_componentsjson = item_dataint.Add("components: json", CommandStructureType.Json);
	item_componentsjson.Description = "components: json";
	item_componentsjson.IsOptional = true;

	return Tree;
}
