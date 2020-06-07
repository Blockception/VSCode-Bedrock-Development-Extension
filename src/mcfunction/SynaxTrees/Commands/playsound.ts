import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of playsound
export const playsoundTree = createplaysound();

function createplaysound() : CommandStructureTree {
	var Tree = new CommandStructureTree("playsound");
	Tree.Description = "Plays a sound.";
	Tree.CanEnd = true;

	var item_sound = Tree.Add("sound:", CommandStructureType.Any);
	item_sound.Description = "sound:";
	item_sound.IsOptional = false;

	var item_string = Tree.Add("string", CommandStructureType.Any);
	item_string.Description = "string";
	item_string.IsOptional = false;

	var item_playertarget = Tree.Add("player: target", CommandStructureType.Target);
	item_playertarget.Description = "The target/selector that targets a player";
	item_playertarget.IsOptional = true;

	var item_positionxyz = Tree.Add("position: x y z", CommandStructureType.Any);
	item_positionxyz.Description = "position: x y z";
	item_positionxyz.IsOptional = true;

	var item_volumefloat = Tree.Add("volume: float", CommandStructureType.Any);
	item_volumefloat.Description = "volume: float";
	item_volumefloat.IsOptional = true;

	var item_pitchfloat = Tree.Add("pitch: float", CommandStructureType.Any);
	item_pitchfloat.Description = "pitch: float";
	item_pitchfloat.IsOptional = true;

	var item_minimumVolumefloat = Tree.Add("minimumVolume: float", CommandStructureType.Any);
	item_minimumVolumefloat.Description = "minimumVolume: float";
	item_minimumVolumefloat.IsOptional = true;

	return Tree;
}
