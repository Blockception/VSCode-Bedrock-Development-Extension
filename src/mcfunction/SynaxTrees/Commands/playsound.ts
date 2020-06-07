import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of playsound
export const playsoundTree = createplaysound();

function createplaysound() : CommandStructureTree {
	var Tree = new CommandStructureTree("playsound");
	Tree.Description = "Plays a sound.";
	Tree.CanEnd = true;

	var item_soundstring = Tree.Add("sound: string", CommandStructureType.Any);
	item_soundstring.Description = "sound: string";
	item_soundstring.IsOptional = false;

	var item_playertarget = item_soundstring.Add("player", CommandStructureType.Target);
	item_playertarget.Description = "The player target/selector";
	item_playertarget.IsOptional = true;

	var item_positionxyz = item_playertarget.Add("position: x y z", CommandStructureType.Any);
	item_positionxyz.Description = "position: x y z";
	item_positionxyz.IsOptional = true;

	var item_volumefloat = item_positionxyz.Add("volume: float", CommandStructureType.Any);
	item_volumefloat.Description = "volume: float";
	item_volumefloat.IsOptional = true;

	var item_pitchfloat = item_volumefloat.Add("pitch: float", CommandStructureType.Any);
	item_pitchfloat.Description = "pitch: float";
	item_pitchfloat.IsOptional = true;

	var item_minimumVolumefloat = item_pitchfloat.Add("minimumVolume: float", CommandStructureType.Any);
	item_minimumVolumefloat.Description = "minimumVolume: float";
	item_minimumVolumefloat.IsOptional = true;

	return Tree;
}
