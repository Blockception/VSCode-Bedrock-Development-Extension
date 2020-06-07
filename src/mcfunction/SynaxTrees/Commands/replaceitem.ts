import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of replaceitem
export const replaceitemTree = createreplaceitem();

function createreplaceitem() : CommandStructureTree {
	var Tree = new CommandStructureTree("replaceitem");
	Tree.Description = "Replaces items in inventories";
	Tree.CanEnd = true;

	//Branch: replaceitem.block
	{
	var item_block = Tree.Add("block", CommandStructureType.Any);
	item_block.Description = "block";
	item_block.IsOptional = false;

	var item_positionxyz = item_block.Add("position: x y z", CommandStructureType.Any);
	item_positionxyz.Description = "position: x y z";
	item_positionxyz.IsOptional = false;

	var item_slot.container = item_positionxyz.Add("slot.container", CommandStructureType.Any);
	item_slot.container.Description = "slot.container";
	item_slot.container.IsOptional = false;

	var item_slotIdint = item_slot.container.Add("slotId", CommandStructureType.Integer);
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

	var item_componentsjson = item_dataint.Add("components: json", CommandStructureType.Any);
	item_componentsjson.Description = "components: json";
	item_componentsjson.IsOptional = true;

	}

	//Branch: replaceitem.entity
	{
	var item_entity = Tree.Add("entity", CommandStructureType.Any);
	item_entity.Description = "entity";
	item_entity.IsOptional = false;

	var item_targettarget = item_entity.Add("target", CommandStructureType.Target);
	item_targettarget.Description = "target: target";
	item_targettarget.IsOptional = false;

	var item_slotTypeEntityEquipmentSlot = item_targettarget.Add("slotType: EntityEquipmentSlot", CommandStructureType.Any);
	item_slotTypeEntityEquipmentSlot.Description = "slotType: EntityEquipmentSlot";
	item_slotTypeEntityEquipmentSlot.IsOptional = false;

	var item_slotIdint = item_slotTypeEntityEquipmentSlot.Add("slotId", CommandStructureType.Integer);
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

	var item_componentsjson = item_dataint.Add("components: json", CommandStructureType.Any);
	item_componentsjson.Description = "components: json";
	item_componentsjson.IsOptional = true;

	}

	return Tree;
}
